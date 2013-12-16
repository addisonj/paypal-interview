define(function(require) {
  var View = require("./View")
  var template = require("jade!./TransactionConfirm")
  var Transaction = require("js/models/Transaction")
  var GenericButton = require("./GenericButton")
  var ButtonGroup = require("./ButtonGroup")
  var formatters = require("js/helpers/formatters")

  var TransactionBuilder = View.extend({
    template: template,

    formatters: formatters,

    modelName: "transaction",

    sendMoney: function() {
      this.getDependency("router").navigate("/transaction/new", {trigger: true})
    },
    history: function() {
      this.getDependency("router").navigate("/transaction/history", {trigger: true})
    },

    initialize: function(opts, model) {
      if (typeof model === "string") {
        model = new Transaction({id: model})
        model.fetch()
      }
      var self = this
      var newBtn = new GenericButton({}, "Send Money", function() { self.sendMoney(); }, "narrow-btn")
      var historyBtn = this.nextBtn = new GenericButton({}, "Transaction History", function() { self.history(); }, "right-btn narrow-btn")
      this.btnGroup = new ButtonGroup({}, [newBtn, historyBtn])
      this.getDependency("footer").setFooterView(this.btnGroup)
      View.prototype.initialize.call(this, {}, model)
    },

    destroy: function() {
      this.btnGroup.destroy()
      View.prototype.destroy.apply(this, arguments)
    }

  })
  return TransactionBuilder
})
