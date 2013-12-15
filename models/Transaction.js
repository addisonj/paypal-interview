var uuid = require("node-uuid")
var check = require("validator").check
var se = require("std-error")
var _ = require("underscore")

// load in the mock datas
var transactions = []
try {
  transactions = require("./mockTransactions.json")
} catch (e) {}
var transactionsById = {}
for (var i = 0; i < transactions.length; i++) {
  transactionsById[transactions[i].id] = transactions[i]
}


var CURRENCY_TYPES = ["USD", "EUR", "JPY"]
var PURPOSE_TYPES = ["PERSONAL", "PAYMENT"]

function Transaction(data) {
  this.id = uuid.v1()
  this.dateAdded = new Date()
  var filtered = _.pick(data, "email", "name", "amount", "currency", "message", "purpose")
  for (var key in filtered) {
    this[key] = filtered[key]
  }
  if (typeof this.amount == "string") {
    this.amount = parseFloat(this.amount, 10)
  }
}

Transaction.currencyTypes = CURRENCY_TYPES
Transaction.purposeTypes = PURPOSE_TYPES

// add in filter params in case we want to do ranges, etc
Transaction.index = function(params, cb) {
  if (typeof params == "function") {
    cb = params
    params = {}
  }

  var start = params.page * params.pageSize
  cb(null, transactions.slice(start, start + params.pageSize))
}

Transaction.getById = function(id, cb) {
  cb(null, transactionsById[id])
}

Transaction.prototype.save = function(cb) {
  var err = this.validate()
  if (err) {
    return cb(err)
  }

  transactionsById[this.id] = this
  transactions.unshift(this)
  cb()
}

Transaction.prototype.validate = function() {
  if (isNaN(this.amount)) {
    return new se.BadParameter("invalid amount entered")
  }

  if (this.amount <= 0) {
    return new se.BadParameter("amount must be greater than zero")
  }

  if (!this.email || !this.amount || !this.currency || !this.purpose) {
    return new se.BadParameter("missing required field, requires email, amount, currency, and purpose fields")
  }

  try {
    check(this.email).isEmail()
    check(this.currency).isIn(CURRENCY_TYPES)
    check(this.purpose).isIn(PURPOSE_TYPES)
  } catch(e) {
    return new se.BadParameter(e.message)
  }
}

module.exports = Transaction

