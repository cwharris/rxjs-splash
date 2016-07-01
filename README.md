RxJS-Splash
===========
*This project is no longer maintained. Please see [React](https://github.com/facebook/react) + [Redux](https://github.com/reactjs/redux), or [CycleJS](https://github.com/cyclejs) for good examples of how to manage UI.*

Push-based MVVM DOM bindings for Reactive Extensions

Check out these [live examples](http://cwharris.github.com/rxjs-splash).

Example
-------

**HTML**
```html
    <input type="text" data-splash="value: name"/>
    <div data-splash="text: name"></div>
```

**JavaScript**
```coffeescript

    var vm = { 
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
**HTML**
```html
    <textarea data-bind="value: html"></textarea>
    <div data-bind="html: html"></div>
```
```js
    sx.bind({
      html: new Rx.BehaviorSubject('<i>HMTL</i>')
    });
```

**CSS**
```html
    <button class="btn" data-splash="css: { selected: isSelected }"></button>
```
```js
    sx.bind({
      isSelected: new Rx.BehaviorSubject(true)
    });
```

**Click**
```html
    <button data-splash="click: sayHi">Hello, World!</button>
```
```js
    sx.bind({
      sayHi: function(vm, e) { 
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
      counter: new Rx.Observable.interval(1000),
      isSelected: new Rx.BehaviorSubject(),
      select: function(vm, e) {
        vm.isSelected.onNext(vm.isSelected.value);
      }
    });
```

**It's Rx!**
```html
    <div data-splash="text: counter"></div>
    <div data-splash="text: counter.take(250)"></div>
    <div data-splash="text: counter.sample(500)"></div>
    <div data-splash="text: counter.delay(1000)"></div>
```
```js
    sx.bind({
      counter: Rx.Observable.interval(10)
    });
```

Disposing
---------
Splash makes un-binding as easy as calling dispose.
```html
    <button data-splash="text: counter, click: dispose"></button>
```
```js
    var binding = sx.bind({
      counter: Rx.Observable.interval(250),
      dispose: function() { binding.dispose(); }
    });
```
