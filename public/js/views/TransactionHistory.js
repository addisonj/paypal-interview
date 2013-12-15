define(function(require) {

  var View = require("./View")
  var Transactions = require("js/models/Transactions")
  var template = require("jade!./TransactionHistory")
  var GenericButton = require("./GenericButton")
  var formatters = require("js/helpers/formatters")
  var $ = require("jquery")
  var _ = require("underscore")

  // we need to include headers for calculating scroll offset
  var HEAD_FOOT_HEIGHT = 60
  var TRIGGER_LOAD_PERC = .85
  var TransactionBuilder = View.extend({
    template: template,
    modelName: "transactions",

    formatters: formatters,

    onScroll: function() {
      var curScroll = $(window).scrollTop() + HEAD_FOOT_HEIGHT
      if (curScroll < this.lastScroll) {
        this.lastScroll = curScroll
        return
      }
      var height = $(document).height() - $(window).height() - HEAD_FOOT_HEIGHT

      if ((curScroll / height) > TRIGGER_LOAD_PERC) {
        this.model.fetchMore()
      }
      this.lastScroll = curScroll
    },

    back: function() {
      this.getDependency("router").navigate("", {trigger: true})
    },

    initialize: function() {
      var self = this
      this.lastScroll = 0
      this.getDependency("header").setHeader("Transaction History")
      this.backBtn = new GenericButton({}, "Back", function() { self.back() }, "wide-btn")
      this.getDependency("footer").setFooterView(this.backBtn)
      model = new Transactions()
      model.fetch()
      View.prototype.initialize.call(this, {}, model)
      $(window).scroll(_.throttle(this.onScroll, 100))
    },

    destroy: function() {
      this.backBtn.destroy()
      View.prototype.destroy.apply(this, arguments)
    }

  })
  return TransactionBuilder
})
