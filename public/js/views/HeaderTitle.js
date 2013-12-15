define(function(require) {
  var View = require("./View")

  var HeaderTitle = View.extend({
    // like main, this gets its element passed in
    make: function() {},

    initialize: function($el) {
      this.el = $el[0]
      this.$el = $el
    },

    setHeader: function(header) {
      this.$el.text(header)
    }

  })
  return HeaderTitle
})
