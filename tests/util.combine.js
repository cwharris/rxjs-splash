(function (window) {

  module('util.combine');

  asyncTest('can combine observables', function () {
    expect(2);

    var a = new Rx.BehaviorSubject(1);
    var b = new Rx.BehaviorSubject(7);

    var obs = sx.util.combine({ a: a, b: b }).take(1);

    obs.subscribe(function (obj) {
      ok(obj.a === 1);
      ok(obj.b === 7);
      start();
    });
  });

  asyncTest('can combine values', function () {
    expect(2);

    var a = 1;
    var b = 7;

    var obs = sx.util.combine({ a: a, b: b }).take(1);

    obs.subscribe(function (obj) {
      ok(obj.a === 1);
      ok(obj.b === 7);
      start();
    });
  });

  asyncTest('can combine values w/observables', function () {
    expect(2);

    var a = 1;
    var b = new Rx.BehaviorSubject(7);

    var obs = sx.util.combine({ a: a, b: b }).take(1);

    obs.subscribe(function (obj) {
      ok(obj.a === 1);
      ok(obj.b === 7);
      start();
    });
  });

}(typeof global == 'object' && global || this));