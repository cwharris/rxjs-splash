// Generated by CoffeeScript 1.4.0
(function() {
  var identitySelect, noDispose, noop, readAsDataURLAsObservable, sx;

  sx = window.sx = {
    utils: {},
    internal: {},
    binders: {}
  };

  noop = function() {};

  noDispose = {
    dispose: noop
  };

  identitySelect = function(x) {
    return x;
  };

  sx.utils.arrayDiff = function(a, b) {
    var item, items, _i, _j, _len, _len1;
    items = [];
    for (_i = 0, _len = a.length; _i < _len; _i++) {
      item = a[_i];
      if (b.indexOf(item) < 0) {
        items.push({
          item: item,
          status: 'remove'
        });
      }
    }
    for (_j = 0, _len1 = b.length; _j < _len1; _j++) {
      item = b[_j];
      if (a.indexOf(item) < 0) {
        items.push({
          item: item,
          status: 'add'
        });
      }
    }
    return items;
  };

  sx.utils.parseBindingOptions = function(param, options) {
    var key, value;
    if (options == null) {
      options = {};
    }
    if (typeof param === 'function' || typeof param.onNext === 'function' || typeof param.subscribe === 'function') {
      options.source = param;
      return options;
    }
    options.source = param.subject || param.action;
    for (key in param) {
      value = param[key];
      options[key] = value;
    }
    return options;
  };

  sx.utils.unwrap = function(valueOrBehavior) {
    if (typeof valueOrBehavior.subscribe === 'function') {
      return valueOrBehavior.value;
    }
    return valueOrBehavior;
  };

  sx.utils.bind = function(obsOrValue, obsOrCallback) {
    if (typeof obsOrValue.subscribe === 'function') {
      return obsOrValue.subscribe(obsOrCallback);
    }
    if (typeof obsOrCallback.onNext === 'function') {
      obsOrCallback.onNext(obsOrValue);
    } else {
      obsOrCallback(obsOrValue);
    }
    return noDispose;
  };

  sx.utils.combine = function(sources) {
    var key, keys, value, values;
    keys = [];
    values = [];
    for (key in sources) {
      value = sources[key];
      keys.push(key);
      values.push(sx.utils.wrap(value));
    }
    return Rx.Observable.combineLatest(values, function() {
      var i, params, _i, _len;
      params = {};
      for (i = _i = 0, _len = keys.length; _i < _len; i = ++_i) {
        key = keys[i];
        params[key] = arguments[i];
      }
      return params;
    });
  };

  sx.utils.toJS = function(obj) {
    return JSON.stringify(obj, function(s, field) {
      if (field instanceof sx.ObservableArray) {
        return field.values;
      }
      if (field instanceof Rx.Observable) {
        return field.value;
      }
      if (field instanceof Rx.Observer) {
        return void 0;
      }
      return field;
    });
  };

  sx.utils.wrap = function(valueOrBehavior) {
    if (typeof valueOrBehavior.subscribe === 'function') {
      return valueOrBehavior;
    }
    return new Rx.BehaviorSubject(valueOrBehavior);
  };

  sx.bind = function(vm, target) {
    target = $(target || window.document.body);
    return sx.internal.bind(target, {
      vm: vm,
      vmRoot: vm,
      vmParent: void 0
    });
  };

  sx.computed = function(options) {
    return Rx.Observable.create(function(o) {
      return sx.utils.combine(options.params).select(options.read).subscribe(o);
    });
  };

  sx.internal.parseBindings = function(target, context) {
    var binding, key, keys, value, values, _ref;
    binding = target.attr('data-splash');
    if (!binding) {
      return null;
    }
    keys = ['$data', '$root', '$parent'];
    values = [context.vm, context.vmRoot, context.vmParent];
    _ref = context.vm;
    for (key in _ref) {
      value = _ref[key];
      keys.push(key);
      values.push(value);
    }
    return new Function(keys, "return { " + binding + " };").apply(null, values);
  };

  sx.internal.bind = function(target, context) {
    var binder, bindings, disposable, options;
    bindings = sx.internal.parseBindings(target, context);
    disposable = new Rx.CompositeDisposable;
    for (binder in bindings) {
      options = bindings[binder];
      disposable.add(sx.binders[binder](target, context, options));
    }
    target.children().each(function() {
      return disposable.add(sx.internal.bind($(this), context));
    });
    return disposable;
  };

  sx.binders.attr = function(target, context, options) {
    var disposable, key, obsOrValue, _fn;
    disposable = new Rx.CompositeDisposable;
    _fn = function() {
      var attr;
      attr = key;
      return disposable.add(sx.utils.bind(obsOrValue, function(x) {
        target.attr(attr, x);
      }));
    };
    for (key in options) {
      obsOrValue = options[key];
      _fn();
    }
    return disposable;
  };

  sx.binders.checked = function(target, context, obsOrValue) {
    var get, observer, set;
    if (obsOrValue.onNext) {
      observer = obsOrValue;
      get = target.onAsObservable('change').select(function() {
        return target.prop('checked');
      }).subscribe(function(x) {
        observer.onNext(x);
      });
    }
    set = sx.utils.bind(obsOrValue, function(x) {
      target.prop('checked', x);
    });
    return new Rx.CompositeDisposable(get, set);
  };

  sx.binders.click = function(target, context, options) {
    return sx.binders.event(target, context, options, 'click', true);
  };

  sx.binders.css = function(target, context, options) {
    var disposable, key, obsOrValue, _fn;
    disposable = new Rx.CompositeDisposable;
    _fn = function() {
      var css;
      css = key;
      return disposable.add(sx.utils.bind(obsOrValue, function(x) {
        target.toggleClass(css, x);
      }));
    };
    for (key in options) {
      obsOrValue = options[key];
      _fn();
    }
    return disposable;
  };

  sx.binders.foreach = function(target, context, options) {
    var disposable, template;
    options = sx.utils.parseBindingOptions(options);
    template = target.html().trim();
    target.empty();
    disposable = new Rx.CompositeDisposable;
    setTimeout(function() {
      return disposable.add(options.source.where(function(x) {
        return x;
      }).subscribe(function(items) {
        var binding, child, item, _i, _len, _results;
        target.empty();
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          child = $(template).appendTo(target);
          _results.push(binding = sx.internal.bind(child, {
            vm: item,
            vmRoot: context.vmRoot,
            vmParent: context.vm
          }));
        }
        return _results;
      }));
    });
    return disposable;
  };

  sx.binders.preview = function(target, context, options) {
    options = sx.utils.parseBindingOptions(options);
    return target.onAsObservable('change').select(function(e) {
      return e.target.files;
    }).where(function(files) {
      return files != null ? files.length : void 0;
    }).select(function(files) {
      var file, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _results.push(readAsDataURLAsObservable(file));
      }
      return _results;
    }).subscribe(options.source);
  };

  readAsDataURLAsObservable = function(file) {
    return Rx.Observable.create(function(o) {
      var reader;
      reader = new FileReader();
      reader.onload = function(e) {
        return o.onNext(e.target.result);
      };
      return reader.readAsDataURL(file);
    });
  };

  sx.binders.event = function(target, context, options, type) {
    var obs;
    if (type == null) {
      type = options.type;
    }
    obs = $(target).onAsObservable(type);
    if (typeof options === 'function') {
      return obs.subscribe(function(e) {
        options({
          target: target,
          context: context,
          e: e
        });
      });
    }
    return obs.subscribe(function(e) {
      options.onNext({
        target: target,
        context: context,
        e: e
      });
    });
  };

  sx.binders.visible = function(target, context, options) {
    return sx.utils.bind(obsOrValue, function(x) {
      target.css('display', x ? '' : 'none');
    });
  };

  sx.binders.text = function(target, context, obsOrValue) {
    return sx.utils.bind(obsOrValue, function(x) {
      target.text(x);
    });
  };

  sx.binders.html = function(target, context, obsOrValue) {
    return sx.utils.bind(obsOrValue, function(x) {
      target.html(x);
    });
  };

  sx.binders.value = function(target, context, options) {
    var blur, focus, get, getObs, observer, set;
    options = sx.utils.parseBindingOptions(options);
    if (options.on && options.on.indexOf('after') === 0) {
      options.on = options.on.slice(5);
      options.delay = true;
    }
    if (typeof options.source.onNext === 'function') {
      observer = options.source;
      getObs = target.onAsObservable(options.on || 'change');
      if (options.delay) {
        getObs = getObs.delay(0);
      }
      get = getObs.select(function() {
        return target.val();
      }).subscribe(function(x) {
        observer.onNext(x);
      });
    }
    if (options.source instanceof Rx.Observable) {
      focus = target.onAsObservable('focus');
      blur = target.onAsObservable('blur');
      options.source = options.source.takeUntil(focus).concat(blur.take(1)).repeat();
    }
    set = sx.utils.bind(options.source, function(x) {
      target.val(x);
    });
    return new Rx.CompositeDisposable(get, set);
  };

}).call(this);
