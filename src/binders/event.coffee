#import core.globals

sx.binders.event = (context, options, type = options.type) ->

  obs = $(context.target).onAsObservable type

  if typeof options is 'function'
    return obs.subscribe (e) ->
      options
        context: context
        e: e

  obs.subscribe (e) ->
    options.onNext
      context: context
      e: e