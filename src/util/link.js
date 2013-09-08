    sx.util.link = function (obsOrValue, obsOrCallback) {

      if (typeof obsOrValue.subscribe === 'function') {
        return obsOrValue.subscribe(obsOrCallback);
      }

      if (typeof obsOrCallback.onNext === 'function') {
        obsOrCallback.onNext(obsOrValue);
      } else {
        obsOrCallback(obsOrValue);
      }

      return emptyDisposable;
    };
