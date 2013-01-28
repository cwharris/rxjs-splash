# import core.globals

sx.binders.foreach = (target, context, obsArray) ->

  template = target.html().trim()
  target.empty()

  disposable = new Rx.CompositeDisposable dispose: -> target.empty().append template

  setTimeout ->
    disposable.add obsArray.subscribe (lifetime) ->
      child = $(template).appendTo target
      disposable.add binding = sx.internal.bind child, {
        vm: lifetime.value
        vmRoot: context.vmRoot
        vmParent: context.vm
      }

      dispose = ->
        child.remove()
        disposable.remove binding
        disposable.remove sub
        disposable.remove disposer
        return

      disposable.add disposer = dispose: dispose
      disposable.add sub = lifetime.subscribe noop, dispose, dispose
      return
      
    return


  disposable