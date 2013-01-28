# import core.globals

sx.binders.css = (target, context, options) ->
  disposable = new Rx.CompositeDisposable
  for key, obsOrValue of options
    do ->
      css = key
      disposable.add sx.utils.bind obsOrValue, (x) ->
        target.toggleClass css, x
        return
      
  disposable