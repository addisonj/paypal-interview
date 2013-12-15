define(function(require) {
  var Backbone = require("backbone")
  var Transaction = require("./Transaction")

  var TransactionCollection = Backbone.Collection.extend({
    initialize: function() {
      this.currentPage = 0
    },
    model: Transaction,
    comparator: '-dateAdded',
    url: "/transactions",
    fetchMore: function() {
      if (this.retrievedAll) return
      var u = this.url + "?page=" + (++this.currentPage)
      this.fetch({url: u, remove: false})
    },

    parse: function(res) {
      if (res.length === 0) {
        this.retrievedAll = true
      }

      return res
    }

  })
  return TransactionCollection
})
