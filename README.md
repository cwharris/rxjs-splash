RxJS-Splash
===========

ko-style bindings for rx

HTML
----
```html

    <div>Name: <span data-splash='text: name'></span></div>
    <div>
      <input type="text" data-splash='value: name'></input>
    </div>
```

JavaScript
-------------
```coffee-script

    vm = { 
      name: new Rx.BehaviorSubject('Christopher Harris')
    };

    sx.bind(vm);
```
