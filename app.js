
var express = require('express')
var http = require('http')
var path = require('path')
var se = require("std-error")

var app = express()

// pull in routes
var index = require("./controllers/index")
var transactions = require("./controllers/transactions")

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(require('stylus').middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(function(err, req, res, next) {
    console.log(err.message)
    console.log(err.stack)
    next(err)
  })
}

app.use(se.defaultHandler)

app.get("/", index.index)
// transactions

app.get("/transactions", transactions.index)
app.get("/transactions/:id", transactions.getById)
app.post("/transactions", transactions.create)



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
