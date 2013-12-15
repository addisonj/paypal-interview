define(function(require) {
  var View = require("./View")
  var Backbone = require("backbone")
  var template = require("jade!./TransactionBuilder")
  var Transaction = require("js/models/Transaction")
  var ButtonGroup = require("./ButtonGroup")
  var GenericButton = require("./GenericButton")
  var formatters = require("js/helpers/formatters")
  var LoadingPage = require("./LoadingPage")

  var TransactionBuilder = View.extend({
    template: template,
    modelName: "transaction",

    formatters: formatters,

    moneyRegex: /^[0-9]+(\.[0-9][0-9])?$/,

    clear: function() {
      this.model.clear()
      this.model.setDefaults()
    },

    setLoading: function(loading) {
      var modal = this.getDependency("modalEl")
      if (loading) {
        this.loading = new LoadingPage()
        modal.append(this.loading.$el)
        this.loading.attached()
      } else {
        if (this.loading) {
          this.loading.destroy()
        }
        modal.empty()
      }
    },

    onSaved: function() {
      this.setLoading(false)
      var router = this.getDependency("router")
      router.finishTransaction(this.model)
      router.navigate("/transaction/finished/" + this.model.id)
    },

    next: function() {
      var self = this
      this.setLoading(true)
      this.model.save({}, {
        success: function() { self.onSaved.apply(self, arguments); }
      })
    },

    _onEmailChange: function(e) {
      if (!e) return
      this.$emailValid.toggleClass("valid", !!e.target.validity.valid)
      this.emailValid = !!e.target.validity.valid
      this.checkValid()
    },

    _checkValid: function() {
      isValid = (this.emailValid && this.moneyRegex.test(this.$amount.val()))
      this.nextBtn.setEnabled(isValid)
    },

    initialize: function() {
      var self = this
      var clearBtn = new GenericButton({}, "Clear", function() { self.clear(); })
      var nextBtn = this.nextBtn = new GenericButton({}, "Next", function() { self.next(); })
      this.btnGroup = new ButtonGroup({}, [clearBtn, nextBtn])
      this.getDependency("header").setHeader("Send Money")
      this.getDependency("footer").setFooterView(this.btnGroup)
      View.prototype.initialize.call(this, {}, new Transaction())
      this.checkValid = function() { self._checkValid.apply(self, arguments); }
      this.onEmailChange = function() { self._onEmailChange.apply(self, arguments); }
      this.$emailValid = this.$el.find(".is-valid-email")
      this.$amount = this.$el.find(".transaction-amount")
      this.emailValid = false
      this.checkValid()
    },

    destroy: function() {
      this.btnGroup.destroy()
      View.prototype.destroy.apply(this, arguments)
    }

  })
  return TransactionBuilder
})
