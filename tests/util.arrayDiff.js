(function (window) {

  module('util.arrayDiff');

  test('can diff empty w/empty', function () {
    expect(1);

    var a = [];
    var b = [];

    var diff = sx.util.arrayDiff(a, b);

    equal(diff.length, 0);
  });

  test('can diff empty w/non-empty', function () {
    expect(1);
  });

}(typeof global == 'object' && global || this));