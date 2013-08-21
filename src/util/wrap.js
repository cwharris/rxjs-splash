    sx.util.wrap = function (valueOrObservable) {
      if (typeof valueOrObservable.subscribe === 'function') {
        return valueOrObservable;
      }
      return new Rx.BehaviorSubject(valueOrObservable);
    };