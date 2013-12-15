define(function(require) {
  var Backbone = require("backbone")

  var TransactionModel = Backbone.Model.extend({
    defaults: {
      currency: "USD",
      purpose: "PERSONAL"
    },
    urlRoot: "/transactions",
    // gets the name but fallbacks to email if no name is set
    getName: function() {
      var n = this.get("name") || this.get("email")
      return n
    },
    setDefaults: function() {
      this.set(this.defaults)
    }
  })
  return TransactionModel
})
