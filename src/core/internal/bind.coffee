# import core.globals

sx.internal.bind = (target, context) ->
  bindings = sx.internal.parseBindings target, context

  disposable = new Rx.CompositeDisposable

  for binder, options of bindings
    disposable.add sx.binders[binder] target, context, options

  target.children().each ->
    disposable.add sx.internal.bind $(@), context

  disposable