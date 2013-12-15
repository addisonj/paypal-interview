define(function(require) {
  var moment = require("moment")
  return {
    "dayFormat" : function(v) {
      return moment(v).format("MM/DD/YYYY")
    },
    "currency" : function(v) {
      if (typeof v !== "number") {
        return v
      }
      return v.toFixed(2).toString()
    },
    "currencySymbol" : function(v) {
      if (v === "EUR") {
        return "€"
      } else if (v === "JPY") {
        return "¥"
      } else {
        return "$"
      }
    }
  }

})
