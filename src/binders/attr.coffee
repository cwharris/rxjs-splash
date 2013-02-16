# import core.globals

sx.binders.attr = (target, context, options) ->
  disposable = new Rx.CompositeDisposable
  for key, obsOrValue of options
    do ->
      attr = key
      disposable.add sx.utils.bind obsOrValue, (x) ->
        target.attr attr, x
        return
      
  disposable