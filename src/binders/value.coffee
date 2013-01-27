# import core.globals

sx.binders.value = (target, context, obsOrValue) ->

  if obsOrValue.onNext
    observer = obsOrValue
    get = target.onAsObservable('change').subscribe (x) ->
      observer.onNext target.val()
      return

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

  # console.log obsOrValue.value

  new Rx.CompositeDisposable get, set