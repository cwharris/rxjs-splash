# import core.globals

sx.binders.value = (target, context, obsOrValue) ->

  if obsOrValue.onNext
    observer = obsOrValue
    get = target.onAsObservable('change')
      .select(->target.val())
      # .distinctUntilChanged()
      .subscribe (x) ->
        observer.onNext x
        return

  if obsOrValue.subscribe
    focus = target.onAsObservable 'focus'
    blur = target.onAsObservable 'blur'
    obsOrValue = obsOrValue
      .takeUntil(focus)
      .concat(blur.take 1)
      .repeat()

  set = sx.utils.bind obsOrValue, (x) ->
    target.val x
    return

  # console.log obsOrValue.value

  new Rx.CompositeDisposable get, set

# import core.globals

sx.binders.value = (target, context, options) ->

  options = sx.utils.parseBindingOptions options

  if options.on and options.on.indexOf('after') is 0
    options.on = options.on.slice(5)
    options.delay = true

  if options.source.onNext
    observer = options.source
    getObs = target.onAsObservable('change ' + options.on)
    getObs = getObs.delay(0) if options.delay
    get = getObs
      .select(-> target.val())
      # .where((x) -> x isnt options.source.value)
      # .distinctUntilChanged()
      .doAction((x) -> console.log x)
      .subscribe (x) ->
        observer.onNext x
        return

  if options.source.subscribe
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