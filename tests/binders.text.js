(function (window) {

  var observable = new Rx.Subject();

  module('binders.text');

  asyncTest('can update text', function() {
    expect(1);

    var element = document.createElement('div');
    var text = 'Hello, World';

    sx.binders.text(element, { }, { source: observable })
      .take(1)
      .subscribe(function(x) {
        ok(element.textContent === text);
        start();
      });

      observable.onNext(text);
  });

} (typeof global == 'object' && global || this));