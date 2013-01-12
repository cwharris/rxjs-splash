RxJS-Splash
===========

Push-based Knockout-style bindings for Reactive Extensions

Example
-------

**HTML**
```html
    <input type="text" data-splash="value: name"/>
    <div data-splash="text: name"></div>
```

**JavaScript**
```coffeescript

    vm = { 
      name: new Rx.BehaviorSubject('Christopher Harris')
    };

    sx.bind(vm);
```

Binders
-------
**Text**
```html
    <span data-splash="text: name"></span>
```
```js
    sx.bind({
      name: new Rx.BehaviorSubject('Christopher Harris')
    });
```

**Value**
```html
    <input data-splash="value: name"/>
```
```js
    sx.bind({
      name: new Rx.BehaviorSubject('Christopher Harris')
    });
```

**CSS**
```html
    <button data-splash="css: { selected: isSelected }"></button>
```
```js
    sx.bind({
      isSelected: new Rx.BehaviourSubject(true)
    });
```

**Click**
```html
    <button data-splash="click: sayHi">Hello, World!</button>
```
```js
    sx.bind({
      sayHi: function(e, vm) { 
        e.preventDefault();
        var text = $(e.currentTarget).text();
        alert(text);
      }
    });
```

**Multiple Binders**
```html
    <button data-splash="text: counter,
                         click: select,
                         css: { selected: isSelected }">
    </button>
```
```js
    sx.bind({
      text: new Rx.Observable.interval(250),
      isSelected: new Rx.BehaviorSubject(),
      select: function(vm, e) {
        vm.isSelected.onNext(vm.isSelected.value);
      }
    });
```

**It's Rx!**
```html
    <div data-splash="text: counter"></div>
    <div data-splash="text: counter.sample(250)"></div>
```
```js
    sx.bind({
      counter: Rx.Observable.interval(1)
    });
```

Disposing
---------
Splash makes un-binding as easy as calling dispose.
```html
    <button data-splash=""></button>
```
```js
    var binding = sx.bind({
      counter: Rx.Observable.interval(250),
      dispose: function() { binding.dispose(); }
    });
```
