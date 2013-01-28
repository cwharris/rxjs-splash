# import core.globals

sx.binders.attr = (target, context, options) ->
  disposable = new Rx.CompositeDisposable
  for attr, obsOrValue in options
    disposable.add sx.utils.bind obsOrValue, (x) ->
      target.attr attr, x
      return
      
  disposable