define(function(require) {
  var View = require("./View")
  var Router = require("js/Router")
  var HeaderTitle = require("./HeaderTitle")
  var FooterContainer = require("./FooterContainer")

  var MainView = View.extend({
    // main is slightly different, it gets its element passed in,
    // so we override default behavior,
    make: function() {},

    initialize: function(opts, $el, $headerEl, $footerEl, $modalEl) {
      this.el = $el[0]
      this.$el
      this.router = new Router(this, $el)
      this.header = new HeaderTitle($headerEl)
      this.footer = new FooterContainer($footerEl)
      this.registerDependency("header", this.header)
      this.registerDependency("footer", this.footer)
      this.registerDependency("modalEl", $modalEl)
    }

  })
  return MainView
})
