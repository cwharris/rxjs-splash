# import core.globals

sx.binders.html = (target, context, obsOrValue) ->
  sx.utils.bind obsOrValue, (x) ->
    target.html x
    return