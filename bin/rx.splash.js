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
    var sx = { internal: { } };
    
    // Defaults
    function noop() { }
    function identity(x) { return x; }
    
    sx.bind = function (vm, element, onNext, onError, onComplete) {
      if (element === undefined) {
        element = document.body;
      } else if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      return sx.internal.bind(element, vm).subscribe(onNext, onError, onComplete);
    };
    sx.internal.bind = function (element, vm) {
      return new Rx.Subject();
    };
    
    sx.internal.parse = function (element, context) {
      var binding = element.getAttribute('data-splash');
      if (binding == null) {
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