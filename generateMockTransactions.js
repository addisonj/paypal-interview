
var fs = require("fs")
var faker = require("Faker")
var Transaction = require("./models/Transaction")

var count = 1000
var transactions = []

var millsInMonth = 1000 * 60 * 60 * 24 * 30

function getRandDateBefore(date) {
  var mills = Math.round(Math.random() * millsInMonth)
  var nd = new Date()
  nd.setTime(date.getTime() - mills)
  return nd
}

var d = new Date()
for (var i = 0; i < count; i++) {
  var data = {}
  data.email = faker.Internet.email()
  if (Math.random() > 0.25) {
    data.name = faker.Company.companyName()
  } else {
    data.name = faker.Name.findName()
  }

  data.amount = (Math.random() * 1000).toFixed(2)
  var curRand = Math.round(Math.random() * (Transaction.currencyTypes.length - 1))
  data.currency = Transaction.currencyTypes[curRand]

  var purpRand = Math.round(Math.random() * (Transaction.purposeTypes.length - 1))
  data.purpose = Transaction.purposeTypes[purpRand]

  if (Math.random() > 0.5) {
    data.message = faker.Lorem.sentence()
  }

  var t = new Transaction(data)
  t.dateAdded = getRandDateBefore(d)
  d = t.dateAdded
  transactions.push(t)
}

fs.writeFile("./models/mockTransactions.json", JSON.stringify(transactions, null, 2), function(err) {
  if (err) throw err
  console.log("generated " + count + " transactions")
})
