###
Splash
###
class Splash

  constructor: ->
    @binders = {}

  bind: (vm, dom, rootVm = vm) ->
    dom = if dom then $(dom) else $(window.document.body)
    @bindElement
      vm: vm
      dom: dom
      rootVm: rootVm
      vmChanged: true

  bindElement: (o) ->
    self = @
    # console.log o
    bindings = parseBindings o

    @applyBindings o, bindings if bindings

    o.dom.children().each ->
      self.bindElement
        vm: o.vm
        dom: $ @
        vmChanged: false

  applyBindings: (o, bindings) ->
    @binders[binder].init(o, options) for binder, options of bindings


  parseBindings = (o) ->
    binding = o.dom.attr 'data-splash'

    return null if not binding

    keys = []
    values = []

    for key, value of o.vm
      keys.push key
      values.push value

    new Function(keys, "return { #{binding} };").apply(null, values)

sx = window.sx = new Splash

sx.binders.text = 
  init: (o, options) ->
    options.subscribe (x) -> o.dom.text x

sx.binders.html = 
  init: (o, options) ->
    options.subscribe (x) -> o.dom.html x

sx.binders.click = 
  init: (o, options) ->
    o.dom.onAsObservable('click').subscribe (e) ->
      e.preventDefault()
      options.call undefined, o.vm, e

sx.binders.css =
  init: (o, options) ->
    target = o.dom
    disposable = new Rx.CompositeDisposable
    for css, source of options
      disposable.add source.subscribe (x) ->
        console.log x
        target.toggleClass css, x

    disposable

sx.binders.value =
  init: (o, options) ->
    target = o.dom
    source = options
    focus = target.onAsObservable('focus')
    blur = target.onAsObservable('blur')
    set = source
      .takeUntil(focus)
      .concat(blur.take 1)
      .repeat()
      .subscribe (x) ->
        target.val x

    get = target
      .onAsObservable('change')
      .subscribe (x) ->
        source.onNext target.val()

    new Rx.CompositeDisposable get, set

sx.binders.foreach =
  init: (o, options) ->
    template = o.dom.html()
    o.dom.empty()
    options.delay(0).subscribe (lifetime) ->
      dom = $(template).appendTo o.dom
      vm = 
        $parent: o.vm
        $root: o.rootVm
        $data: lifetime.value
      sx.bind vm, dom, o.rootVm
      lifetime.subscribe(
        ->
        -> dom.remove()
        -> dom.remove()
        )