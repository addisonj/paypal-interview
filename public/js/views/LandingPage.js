define(function(require) {
  var View = require("./View")
  var template = require("jade!./LandingPage")

  var LandingPage = View.extend({
    template: template,

    events: {
      "click .send-money-btn" : "sendMoney",
      "click .trans-history-btn" : "transactionHistory"
    },

    sendMoney: function() {
      this.getDependency("router").navigate("/transaction/new", {trigger: true})
    },

    transactionHistory: function() {
      this.getDependency("router").navigate("/transaction/history", {trigger: true})
    },

    initialize: function() {
      this.getDependency("header").setHeader("What are we Doing?")
      View.prototype.initialize.apply(this, arguments)
    }

  })
  return LandingPage
})
