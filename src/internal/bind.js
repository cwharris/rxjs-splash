    sx.internal.bind = function (element, context) {
      return Rx.Observable.create(function (o) {
        var bindings = sx.internal.parse(element, context);
        for (var name in bindings) {
          var options = sx.internal.formatOptions(bindings[name]);
          var binding = sx.binders[name](element, context, options);
          o.onNext(binding);
        }
        var children = element.children;
        for (var i = 0, len = children.length; i < len; i++) {
          o.onNext(sx.internal.bind(children[i], context));
        }
      }).mergeObservable();
    };
    