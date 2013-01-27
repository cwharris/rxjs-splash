# import core.globals

sx.binders.foreach = (target, context, obsArray) ->
  template = target.html().trim() # this needs to be replaced with an actual templating engine
  context.target.empty()
  obsArray.delay(0).subscribe (lifetime) ->
    child = $(template).appendTo target
    binding = sx.internal.bind
      vm: lifetime.value
      vmRoot: context.vmRoot
      vmParent: context.vm
      target: child
    dispose = ->
      child.remove()
      binding.dispose()
    lifetime.subscribe noop, dispose, dispose
    return