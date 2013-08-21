    sx.internal.formatOptions = function (options) {

      var typeOfOptions = typeof options;

      // Most Likely Scenario
      if (
        'function' === typeOfOptions ||
        'string' === typeOfOptions ||
        'number' === typeOfOptions ||
        'function' === typeof options.subscribe ||
        'function' === typeof options.onNext
        ) {
        return {
          source: options
        };
      }

      return options;
    };
    