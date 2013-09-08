/*
Copyright (c) 2013 Christopher Harris
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function (window, undefined) {

    var freeExports = typeof exports == 'object' && exports,
        freeModule = typeof module == 'object' && module && module.exports == freeExports && module,
        freeGlobal = typeof global == 'object' && global;
    if (freeGlobal.global === freeGlobal) {
        window = freeGlobal;
    }

     /** 
     * @name sx
     * @type Object
     */
    var sx = {
        util: { },
        internal: { },
        binders: { },
    };
    
    // Defaults
    function noop() { }
    function identity(x) { return x; }
    
    var emptyDisposable = Rx.Disposable.empty;
    
    sx.util.link = function (obsOrValue, obsOrCallback) {

      if (typeof obsOrValue.subscribe === 'function') {
        return obsOrValue.subscribe(obsOrCallback);
      }

      if (typeof obsOrCallback.onNext === 'function') {
        obsOrCallback.onNext(obsOrValue);
      } else {
        obsOrCallback(obsOrValue);
      }

      return emptyDisposable;
    };

    sx.util.wrap = function (valueOrObservable) {
      if (typeof valueOrObservable.subscribe === 'function') {
        return valueOrObservable;
      }
      return new Rx.BehaviorSubject(valueOrObservable);
    };
    
    sx.util.combine = function (template) {

      var keys = [];
      var values = [];

      for (var key in template) {
        keys.push(key);
        values.push(sx.util.wrap(template[key])); // wastes memory?
      }

      return Rx.Observable.combineLatest(values, function () {
        var params = { };
        for (var i = 0, len = keys.length; i < len; i++) {
          params[keys[i]] = arguments[i];
        }
        return params;
      });
    };
    
    (function () {

      var containsItemFrom    = function (item) { return this.indexOf(item) !== -1; };
      var notContainsItemFrom = function (item) { return this.indexOf(item) === -1; };
      var toStatus = function (item) { return { value: item, status: this.toString() }; };

      // arrayDiff assumes no duplicate items

      sx.util.arrayDiff = function (a, b) {

        var added     = b.filter(notContainsItemFrom, a).map(toStatus, 'added');
        var retained  = b.filter(containsItemFrom,    a).map(toStatus, 'retained');
        var removed   = a.filter(notContainsItemFrom, b).map(toStatus, 'removed');

        return added.concat(retained, removed);
      };

    })();
    
    sx.internal.parse = function (element, context) {
      var binding = element.getAttribute('data-splash');
      if (!binding) {
        return null;
      }

      var vm = context.vm;
      var keys = ['$data', '$root', '$parent'];
      var values = [vm, context.vmRoot, context.vmParent];

      for (var key in vm) {
        keys.push(key);
        values.push(vm[key]);
      }

      return new Function(keys, "return { " + binding + " };").apply(null, values);
    };
    
    sx.internal.formatOptions = function (options) {

      var typeOfOptions = typeof options;

      // Most Likely Scenario
      if (
        'function' === typeOfOptions ||
        'string' === typeOfOptions ||
        'number' === typeOfOptions ||
        'function' === typeof options.subscribe ||
        'function' === typeof options.onNext
        ) {
        return {
          source: options
        };
      }

      return options;
    };
    
    sx.internal.bind = function (element, context) {
      return Rx.Observable.create(function (o) {
        var bindings = sx.internal.parse(element, context);
        for (var name in bindings) {
          var options = sx.internal.formatOptions(bindings[name]);
          var binding = sx.binders[name](element, context, options);
          o.onNext(binding);
        }
        var children = element.children;
        for (var i = 0, len = children.length; i < len; i++) {
          o.onNext(sx.internal.bind(children[i], context));
        }
      }).mergeObservable();
    };
    
    sx.bind = function (vm, element, onNext, onError, onComplete) {
      if (element === undefined) {
        element = document.body;
      } else if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      return sx.internal.bind(element, {
        vm: vm,
        vmRoot: vm,
        vmParent: undefined
      }).subscribe(onNext, onError, onComplete);
    };

    sx.binders.text = function (element, context, options) {
      return options.source.doAction(function (x) {
        element.textContent = x;
      });
    };
    // Check for AMD
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        window.sx = sx;
        return define(function () {
            return sx;
        });
    } else if (freeExports) {
        if (typeof module == 'object' && module && module.exports == freeExports) {
            module.exports = sx;
        } else {
            freeExports = sx;
        }
    } else {
        window.sx = sx;
    }

}(this));