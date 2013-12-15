define(function(require) {
  var Backbone = require("backbone")
  var rivets = require("rivets")
  var dependencies = {}

  rivets.adapters[":"] = {
    subscribe: function(obj, keypath, callback) {
      if (obj instanceof Backbone.Collection) {
        obj.on("add remove reset", function() {
          callback(obj[keypath])
        })
      } else {
        obj.on("change:" + keypath, function(m, v) {
          callback(v)
        })
      }
    },

    unsubscribe: function(obj, keypath, callback) {
      if (obj instanceof Backbone.Collection) {
        obj.off("add remove reset", function() {
          callback(obj[keypath])
        })
      } else {
        obj.off("change:" + keypath, function(m, v) {
          callback(v)
        })
      }
    },

    read: function(obj, keypath) {
      if(obj instanceof Backbone.Collection) {
        return obj[keypath]
      } else {
        return obj.get(keypath)
      }
    },

    publish: function(obj, keypath, value) {
      if(obj instanceof Backbone.Collection) {
        obj[keypath] = value
      } else {
        obj.set(keypath, value)
      }
    }
  }


  var View = Backbone.View.extend({
    routines: {},
    initialize: function(opts, model) {
      this.model = model
      this.setElement(this.make())

      for(var name in this.routines) {
        this.rivets.routines[name] = this.routines[name]
      }

      for(var name in this.formatters) {
        this.rivets.formatters[name] = this.formatters[name]
      }

      this.render()
    },

    bind: function(model, el) {
      if (!el) el = this.$el
      return this.rivets.bind(el, model)
    },

    attached: function() {
      if(this.model && this.modelName) {
        var binding = {}
        binding[this.modelName] = this.model
        binding.controller = this
        this.binding = this.bind(binding)
      }

      this.onAttached()
    },

    rivets: rivets,

    // default is no op
    onAttached: function() {},

    make: function() {
      if (!this.template) {
        throw new Error("No tempalte for view!")
      }

      return this.template(this.model)
    },

    registerDependency: function(name, dep) {
      dependencies[name] = dep
    },

    getDependency: function(name) {
      return dependencies[name]
    },

    // Makes it easy to have child views. Just create a container: <div class="bob"></div>
    // then call this.child('.bob', new Bob())
    // or: this.bob = new Bob(); this.child('.bob', this.bob)
    // WARNING: make sure to call super() in your destroy method if you have one
    child: function(selector, view) {
      this.autoChildren = this.autoChildren || {}

      //this will remove any old child, because destroy calls remove
      this.destroyChild(selector)

      // set the container and save the view for destruction later
      var $container = this.$el.find(selector)

      if (!$container.length)
        throw new Error("Could not find container: " + selector)

      $container.append(view.$el)
      this.autoChildren[selector] = view
    },

    destroyChild: function(selector) {
      if (this.autoChildren && this.autoChildren[selector]) {
        if (this.autoChildren[selector].destroy) {
          this.autoChildren[selector].destroy()
          delete this.autoChildren[selector]
        }
      }
    },


    destroy: function() {

      if (this.destroyed) return

      //destroy any children
      for (var selector in this.autoChildren) {
        this.destroyChild(selector)
      }

      this.autoChildren = null

      this.off()
      this.$el.remove() // it is somewhat important that the el is removed after all children have been destroyed
      this.destroyed = true
    }
  })

  return View
})
