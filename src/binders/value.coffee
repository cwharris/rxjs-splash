# import core.globals

sx.binders.value = (target, context, obsOrValue) ->

  if obsOrValue.subscribe
    focus = target.onAsObservable 'focus'
    blur = target.onAsObservable 'blur'
    obsOrValue = obsOrValue
      .takeUntil(blur)
      .concat(blur.take 1)
      .repeat()

  set = sx.utils.bind obsOrValue, (x) ->
    target.val x
    return

  if obsOrValue.onNext
    get = target.onAsObservable('change').subscribe (x) ->
      obsOrValue.onNext target.val()
      return

  new Rx.CompositeDisposable get, set