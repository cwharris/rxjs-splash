###
Observable Array
###
window.ObservableArray = class ObservableArray extends Rx.Subject

  constructor: (items = []) ->
    super
    @values = []
    @lifetimes = []
    @push item for item in items

  push: (value) ->
    @values.push value
    @lifetimes.push lifetime = new Rx.BehaviorSubject value
    @onNext lifetime
    value

  remove: (value) ->
    index = @values.indexOf value
    if index is -1 
      console.log index
    @splice index, 1

  splice: ->
    Array::splice.apply @values, arguments
    removed = Array::splice.apply @lifetimes, arguments
    lifetime.onCompleted() for lifetime in removed

  subscribe: (observerOrOnNext) ->
    subscription = super
    @purge()
    observerOrOnNext = if arguments.length > 1 or typeof observerOrOnNext is 'function' then observerOrOnNext else observerOrOnNext.onNext
    observerOrOnNext lifetime for lifetime in @lifetimes
    subscription

  purge: ->
    @remove lifetime for lifetime in @lifetimes when lifetime.isCompleted

  dispose: ->
    lifetime.onCompleted() for lifetime in @lifetimes

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

sx.utils =
  wrap: (obsOrValue) ->
    return if obsOrValue.subscribe then obsOrValue else new Rx.BehaviorSubject obsOrValue

sx.computed = (options) ->

  keys = []
  values = []

  for key, value of options.params
    keys.push key
    values.push sx.utils.wrap value

  source = Rx.Observable.combineLatest(values, ->arguments).select (values) ->
    params = {}
    params[key] = values[i] for key, i in keys
    params

  Rx.Observable.create (o) -> source.select(options.read).subscribe o

sx.binders.text = 
  init: (o, options) ->
    sx.utils.wrap(options).subscribe (x) -> o.dom.text x

sx.binders.html = 
  init: (o, options) ->
    sx.utils.wrap(options).subscribe (x) -> o.dom.html x

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
        target.toggleClass css, x

    disposable

sx.binders.value =
  init: (o, options) ->
    target = o.dom
    source = sx.utils.wrap options
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
    template = o.dom.html().trim()
    o.dom.empty()
    sx.utils.wrap(options).delay(0).subscribe (lifetime) ->
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