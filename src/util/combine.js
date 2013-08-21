    sx.util.combine = function (template) {

      var keys = [];
      var values = [];

      for (var key in template) {
        keys.push(key);
        values.push(sx.util.wrap(template[key])); // wastes memory?
      }

      return Rx.Observable.combineLatest(values, function () {
        var params = { };
        for (var i = 0, len = keys.length; i < len; i++) {
          params[keys[i]] = arguments[i];
        }
        return params;
      });
    };