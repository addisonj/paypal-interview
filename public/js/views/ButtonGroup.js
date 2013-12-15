define(function(require) {
  var Backbone = require("backbone")

  // This is a super simple view, so we don't need much fancy, use base View
  var ButtonGroup = Backbone.View.extend({
    tagName: "div",
    className: "button-group",

    initialize: function(opts, btns) {
      this.btns = btns
      for(var i = 0; i < this.btns.length; i++) {
        this.appendButton(btns[i])
      }
    },

    appendButton: function(btn) {
      this.$el.append(btn.$el)
      if (btn.attached) {
        btn.attached()
      }
    },

    destroy: function() {
      for(var i = 0; i < this.btns.length; i++) {
        this.btns[i].destroy()
      }
      this.$el.remove()
    }

  })
  return ButtonGroup
})
