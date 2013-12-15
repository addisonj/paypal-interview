define(function(require) {
  var View = require("./View")

  var FooterContainer = View.extend({
    // like main, this gets its element passed in
    make: function() {},

    initialize: function($el) {
      this.el = $el[0]
      this.$el = $el
    },

    setFooterView: function(view) {
      console.log("old", this.view, "new", view)
      this.removeView()
      this.view = view
      var self = this
      this.$el.append(view.$el)
    },

    removeView: function() {
      if (this.view && this.view.destroy) {
        this.view.destroy()
        this.view = null
      }
    }

  })
  return FooterContainer
})
