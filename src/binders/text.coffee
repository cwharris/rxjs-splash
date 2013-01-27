# import core.globals

sx.binders.text = (target, context, obsOrValue) ->
  sx.utils.bind obsOrValue, (x) ->
    target.text x
    return