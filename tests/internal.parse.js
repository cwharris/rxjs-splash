(function (window) {

  module('internal.parse');

  test('can parse', function () {

    var dom = $('<div data-splash="text: obs"></div>')[0];

    var vm = {
        obs: new Rx.BehaviorSubject('value')
    };

    var parsed = sx.internal.parse(dom, {
      vm: vm,
      vmRoot: vm,
      vmParent: undefined
    });

    ok(Object.keys(parsed).length === 1, 'parsed has only one key.');
    ok(parsed.hasOwnProperty('text'), 'parsed.text exists.');
    ok(parsed.text === vm.obs, "parsed.text has correct value.");
  });

}(typeof global == 'object' && global || this));