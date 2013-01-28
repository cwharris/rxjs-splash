# import core.globals

sx.binders.checked = (target, context, obsOrValue) ->

  if obsOrValue.onNext
    observer = obsOrValue
    get = target.onAsObservable('change')
      .select(->target.prop 'checked')
      .subscribe (x) ->
        observer.onNext x
        return

  set = sx.utils.bind obsOrValue, (x) ->
    target.prop 'checked', x
    return

  # console.log obsOrValue.value

  new Rx.CompositeDisposable get, set