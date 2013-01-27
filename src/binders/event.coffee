# import core.globals

sx.binders.event = (target, context, options, type = options.type) ->

  obs = $(target).onAsObservable type

  if typeof options is 'function'
    return obs.subscribe (e) ->
      options
        context: context
        e: e
      return

  obs.subscribe (e) ->
    options.onNext
      context: context
      e: e
    return