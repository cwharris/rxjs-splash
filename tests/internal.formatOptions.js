(function (window) {

  var func = function (o) { };
  var observable = new Rx.Subject().asObservable();
  var observer = Rx.Observer.create(func);
  var options = { };
  var string = 's';
  var number = 7;

  module('internal.formatOptions');

  test('can format string', function () {
    var output = sx.internal.formatOptions(string);
    ok(output.source === string);
  });

  test('can format number', function () {
    var output = sx.internal.formatOptions(number);
    ok(output.source === number);
  });

  test('can format function', function () {
    var output = sx.internal.formatOptions(func);
    ok(output.source === func);
  });

  test('can format observable', function () {
    var output = sx.internal.formatOptions(observable);
    ok(output.source === observable);
  });

  test('can format observer', function () {
    var output = sx.internal.formatOptions(observer);
    ok(output.source === observer);
  });

  test('can format object', function () {
    var output = sx.internal.formatOptions(options);
    ok(output === options);
  });

}(typeof global == 'object' && global || this));