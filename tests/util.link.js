(function (window) {

  var value = { };
  var func = function (x) {
    ok(x === value);
    start();
  }
  var obs = new Rx.Subject();
  var observer = Rx.Observer.create(func);
  var disposable;

  module('util.link', {
    teardown: function () {
      if (disposable && typeof (disposable.dispose === 'function')) {
        disposable.dispose();
      }
    }
  });

  asyncTest('can link observable -> function', function () {
    expect(1);
    disposable = sx.util.link(obs, func);
    obs.onNext(value);
  });

  asyncTest('can link observable -> observer', function () {
    expect(1);
    disposable = sx.util.link(obs, observer);
    obs.onNext(value);
  });

  asyncTest('can link object -> function', function () {
    expect(1);
    disposable = sx.util.link(value, func);
  });

  asyncTest('can link object -> observer', function () {
    expect(1);
    disposable = sx.util.link(value, observer);
  });

}(typeof global == 'object' && global || this));