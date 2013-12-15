var se = require("std-error")

var Transaction = require("../models/Transaction")

exports.index = function(req, res, next) {
  var page = req.query.page || 0
  var pageSize = req.query.pageSize || 30
  Transaction.index({page: page, pageSize: pageSize}, function(err, transactions) {
    if (err) return next(err)
    res.json(transactions)
  })
}

exports.create = function(req, res, next) {
  var t = new Transaction(req.body)
  setTimeout(function() {
    t.save(function(err) {
      if (err) return next(err)
      res.json(t)
    })
  }, Math.floor(2000 * Math.random()))
}

exports.getById = function(req, res, next) {
  Transaction.getById(req.param("id"), function(err, t) {
    if (err) return next(err)
    if (!t) return next(new se.NotFound("couldn't find transaction by id"))
    res.json(t)
  })
}
