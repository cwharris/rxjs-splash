    sx.bind = function (vm, element, onNext, onError, onComplete) {
      if (element === undefined) {
        element = document.body;
      } else if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      return sx.internal.bind(element, vm).subscribe(onNext, onError, onComplete);
    };