(function (window) {

  module('internal.bind');

  asyncTest('can bind', function () {

    var element = document.createElement('div');

    element.setAttribute('data-splash', 'text: name');

    var vm = {
      name: new Rx.BehaviorSubject('RxJS-Splash')
    };

    var bindings = sx.internal.bind(element, {
      vm: vm,
      vmRoot: vm,
      vmParent: undefined
    });

    bindings.subscribe(function () {
      ok(true);
      start();
    })

  });

} (typeof global == 'object' && global || this));