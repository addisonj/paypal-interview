define(function(require) {
  
  var Jade = require('jade/source');

  return {
    load: function(name, require, callback, config) {
      config = config || (config = {});
      config.jade = config.jade || (config.jade = {});
      config.jade.extension = config.jade.extension || (config.jade.extension = 'jade');

      require(['text!' + name + '.' + config.jade.extension], function(content) {
        var template = Jade.compile(content);
        callback(template);
      });
    }
  };
});