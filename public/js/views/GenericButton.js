define(function(require) {
  var Backbone = require("backbone")

  var GenericButton = Backbone.View.extend({
    tagName: "button",
    className: "button generic-btn",

    events: {
      "click" : "action"
    },

    destroy: function() {
      this.$el.remove()
    },

    action: function() {},

    initialize: function(opts, btnName, handler, style) {
      if (handler) {
        this.action = handler
      }
      this.$el.text(btnName)
      if (style) {
        this.$el.addClass(style)
      }
    },

    setEnabled: function(val) {
      this.$el.attr("disabled", !val)
    }

  })
  return GenericButton
})
