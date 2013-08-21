    sx.bind = function (vm, element) {
      if (element === undefined) {
        element = document.body;
      } else if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      sx.internal.bind(element, vm);
    };

    sx.internal.bind = function (element, vm) {
      console.log(arguments);
    };
