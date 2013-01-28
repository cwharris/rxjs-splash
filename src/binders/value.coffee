sx.binders.value = (target, context, options) ->

  options = sx.utils.parseBindingOptions options

  if options.on and options.on.indexOf('after') is 0
    options.on = options.on.slice(5)
    options.delay = true

  if typeof options.source.onNext is 'function'
    observer = options.source
    getObs = target.onAsObservable(options.on or 'change')
    getObs = getObs.delay(0) if options.delay
    get = getObs
      .select(-> target.val())
      .subscribe (x) ->
        observer.onNext x
        return

  if options.source instanceof Rx.Observable
    focus = target.onAsObservable 'focus'
    blur = target.onAsObservable 'blur'
    options.source = options.source
      .takeUntil(focus)
      .concat(blur.take 1)
      .repeat()

  set = sx.utils.bind options.source, (x) ->
    target.val x
    return

  # console.log obsOrValue.value

  new Rx.CompositeDisposable get, set