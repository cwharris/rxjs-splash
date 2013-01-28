# import core.globals

sx.binders.visible = (target, context, options) ->
  sx.utils.bind obsOrValue, (x) ->
    target.css if x then '' else 'none'
    return