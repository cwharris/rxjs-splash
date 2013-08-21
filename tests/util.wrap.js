(function (window) {

  var value = { };
  var observable = new Rx.Subject().asObservable();

  module('util.wrap');

  test('can wrap value', function () {
    var output = sx.util.wrap(value);
    ok(typeof output.subscribe === 'function');
  });

  test('can return observable', function () {
    var output = sx.util.wrap(observable);
    ok(output === observable);
  });

}(typeof global == 'object' && global || this));