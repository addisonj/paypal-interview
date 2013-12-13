var se = require("std-error")

var Transaction = require("../models/Transaction")

exports.index = function(req, res, next) {
  Transaction.index(function(err, transactions) {
    if (err) return next(err)
    res.json(transactions)
  })
}

exports.create = function(req, res, next) {
  var t = new Transaction(req.body)
  t.save(function(err) {
    if (err) return next(err)
    res.json(t)
  })
}

exports.getById = function(req, res, next) {
  Transaction.getById(req.param("id"), function(err, t) {
    if (err) return next(err)
    if (!t) return next(new se.NotFound("couldn't find transaction by id"))
    res.json(t)
  })
}
