require(['jquery', "js/views/MainView"], function($, MainView) {
  var main = new MainView({}, $("#primary"), $(".section-title"), $(".footer-container"), $(".modal-wrapper"))
  Backbone.history.start()
})
