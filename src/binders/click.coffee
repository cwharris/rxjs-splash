# import core.globals

sx.binders.click = (target, context, options) ->
  sx.binders.event target, context, options, 'click', true