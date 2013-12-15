define(function(require) {
  var Backbone = require("backbone")
  var TransactionBuilder = require("js/views/TransactionBuilder")
  var LandingPage = require("js/views/LandingPage")
  var TransactionConfirm = require("js/views/TransactionConfirm")
  var TransactionHistory = require("js/views/TransactionHistory")

  var Router = Backbone.Router.extend({
    initialize: function(mainView, $root) {
      this.$root = $root
      mainView.registerDependency("router", this)
    },

    routes: {
      "" : "home",
      "transaction/new" : "newTransaction",
      "transaction/finished/:id" : "finishTransaction",
      "transaction/history" : "transactionHistory",
      "transaction/detail/:id": "transactionDetail"
    },

    home: function() {
      this.page(new LandingPage())
    },

    newTransaction: function() {
      this.page(new TransactionBuilder())
    },

    finishTransaction: function(id) {
      this.page(new TransactionConfirm({}, id))
    },

    transactionHistory: function() {
      this.page(new TransactionHistory())
    },

    transactionDetail: function(id) {
    },

    page: function(view) {
      if (this.view) {
        this.view.destroy()
      }
      this.view = view
      this.$root.append(view.$el)
      this.view.attached()
    }
  })
  return Router

})
