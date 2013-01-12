###
Splash
###

class Splash

  constructor: ->

    @binders = {}

  bind: (vm, dom) ->

    disposable = new Rx.CompositeDisposable

    self = this

    dom = $(dom || 'body')

    targets = dom.find('[data-splash]')

    bindings = targets.map ->
      target = $ this
      target: target
      bindings: self.parseBindings vm, target.attr 'data-splash'

    # targets.removeAttr 'data-splash'

    bindings.each ->
      disposable.add self.binders[key].init(this.target, {options: value, vm: vm}) for key, value of this.bindings

    disposable

  parseBindings: (vm, binding) ->
    keys = []
    values = []

    for key, value of vm
      keys.push key
      values.push value

    new Function(keys, 'return {' + binding + '};').apply(null, values)

window.sx = new Splash

###
Binders
###

sx.binders.text =
  init: (target, o) ->
    o.options.subscribe (x) -> target.text x

sx.binders.value =
  init: (target, o) ->
    focus = target.onAsObservable('focus')
    blur = target.onAsObservable('blur')
    source = o.options
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

sx.binders.css =
  init: (target, o) ->
    disposable = new Rx.CompositeDisposable
    for css, source of o.options
      disposable.add source.subscribe (x) ->
        target.toggleClass css, x

    disposable

sx.binders.click =
  init: (target, o) ->
    target.onAsObservable('click').subscribe (e) ->
      e.preventDefault()
      o.options.call o.vm, o.vm, e

# Rx.Subject.createMap = (source, fromSource, toSource) ->

#   subscribe: (o) ->
#     source.select(fromSource).subscribe o

#   onNext: (x) ->
#     source.onNext toSource x