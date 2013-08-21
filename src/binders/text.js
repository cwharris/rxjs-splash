    sx.binders.text = function (element, context, options) {
      return options.source.doAction(function (x) {
        element.textContent = x;
      });
    };