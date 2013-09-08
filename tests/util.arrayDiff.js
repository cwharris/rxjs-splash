(function (window) {

  module('util.arrayDiff');

  test('can diff no changes', function () {
    expect(1);

    var current = [];
    var next = [];

    var diff = sx.util.arrayDiff(current, next);

    equal(diff.length, 0);
  });

  test('can diff added items', function () {
    expect(4);

    var current = [];
    var next = ['a', 'b', 'c'];

    var diff = sx.util.arrayDiff(current, next);

    equal(diff.length, 3);

    var byValue = function (item) {
      return item.value === this.toString();
    };

    var a = diff.filter(byValue, 'a')[0];
    equal(a.status, 'added');

    var b = diff.filter(byValue, 'b')[0];
    equal(b.status, 'added');

    var c = diff.filter(byValue, 'c')[0];
    equal(c.status, 'added');

  });

  test('can diff retained items', function () {
    expect(4);

    var current = ['a', 'b', 'c'];
    var next = ['a', 'b', 'c'];

    var diff = sx.util.arrayDiff(current, next);

    equal(diff.length, 3);

    var byValue = function (item) {
      return item.value === this.toString();
    };

    var a = diff.filter(byValue, 'a')[0];
    equal(a.status, 'retained');

    var b = diff.filter(byValue, 'b')[0];
    equal(b.status, 'retained');

    var c = diff.filter(byValue, 'c')[0];
    equal(c.status, 'retained');

  });

  test('can diff removed items', function () {
    expect(4);

    var current = ['a', 'b', 'c'];
    var next = [];

    var diff = sx.util.arrayDiff(current, next);

    equal(diff.length, 3);

    var byValue = function (item) {
      return item.value === this.toString();
    };

    var a = diff.filter(byValue, 'a')[0];
    equal(a.status, 'removed');

    var b = diff.filter(byValue, 'b')[0];
    equal(b.status, 'removed');

    var c = diff.filter(byValue, 'c')[0];
    equal(c.status, 'removed');

  });

  test('can diff mixed items', function () {
    expect(4);

    var current = ['a', 'b'];
    var next = ['b', 'c'];

    var diff = sx.util.arrayDiff(current, next);

    equal(diff.length, 3);

    var byValue = function (item) {
      return item.value === this.toString();
    };

    var a = diff.filter(byValue, 'a')[0];
    equal(a.status, 'removed');

    var b = diff.filter(byValue, 'b')[0];
    equal(b.status, 'retained');

    var c = diff.filter(byValue, 'c')[0];
    equal(c.status, 'added');

  });

}(typeof global == 'object' && global || this));