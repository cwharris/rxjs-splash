# import core.globals

sx.binders.event = (target, context, options, type = options.type) ->

  obs = $(target).onAsObservable type

  if typeof options is 'function'
    return obs.subscribe (e) ->
      options
        target: target
        context: context
        e: e
      return

  obs.subscribe (e) ->
    options.onNext
      target: target
      context: context
      e: e
    return