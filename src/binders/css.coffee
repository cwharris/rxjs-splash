# import core.globals

sx.binders.css = (target, context, options) ->
  disposable = new Rx.CompositeDisposable
  for css, obsOrValue in options
    disposable.add sx.utils.bind obsOrValue, (x) ->
      target.css css, x
      return
      
  disposable