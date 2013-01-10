rxjs-splash
===========

ko-style bindings for rx

HTML

    <div>Name: <span data-splash='text: name'></span></div>
    <div>
      <input type="text" data-splash='value: name'></input>
    </div>

Coffee-Script

    vm = 
      name: new Rx.BehaviorSubject 'Christopher Harris'

    sx.bind vm

