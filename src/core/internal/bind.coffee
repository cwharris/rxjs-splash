# import core.globals

sx.internal.bind = (target, context) ->
  bindings = sx.internal.parseBindings context

  context.target.children().each ->
    sx.internal.bind $(@), context