# import core.globals

sx.internal.bind = (target, context) ->
  bindings = sx.internal.parseBindings target, context

  for binder, options of bindings
    sx.binders[binder] target, context, options

  target.children().each ->
    sx.internal.bind $(@), context