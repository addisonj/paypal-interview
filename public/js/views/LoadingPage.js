define(function(require) {
  var View = require("./View")
  var template = require("jade!./LoadingPage")
  var Spinner = require("spin-js").Spinner

  var LoadingPage = View.extend({
    template: template,
    initialize: function() {
      View.prototype.initialize.apply(this, arguments)
      var spinTarget = this.$el.find(".loading-spinner")
      var spinOpts = {
        color: "#fff"
      }
      this.spinner = new Spinner(spinOpts).spin()
      spinTarget.append(this.spinner.el)
    }
  })
  return LoadingPage
})
