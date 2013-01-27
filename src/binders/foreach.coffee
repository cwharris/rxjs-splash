# import core.globals

sx.binders.foreach = (target, context, obsArray) ->
  template = target.html().trim() # this needs to be replaced with an actual templating engine
  target.empty()
  obsArray.delay(0).subscribe (lifetime) ->
    child = $(template).appendTo target
    binding = sx.internal.bind child, {
      vm: lifetime.value
      vmRoot: context.vmRoot
      vmParent: context.vm
    }
    dispose = ->
      child.remove()
      binding.dispose()
    lifetime.subscribe noop, dispose, dispose
    return