->
  # class ObservableCollection
  #   constructor: ->
  #     @keys = []
  #     @values = []
  #     @subscribers = []

  #   add: (x) ->
  #     @keys.push x
  #     @values.push value = new Rx.BehaviorSubject x
  #     @publish value

  #   remove: (x) ->
  #     i = @keys.indexOf x
  #     return if i is -1
  #     @keys.splice i, 1
  #     value = @values.splace i, 1
  #     value.dispose()

  #   subscribe: (onNext) ->
  #     @subscribers.push onNext

  #     onNext value for value in @values

  #     dispose: -> @subscribers.splice @subscribers.indexOf(onNext), 1

  #   publish: (value) ->

  #     onNext value for onNext in @subscribers

  # $ ->
  #   sx.bind
  #     name: new Rx.BehaviorSubject 'Christopher Harris'
  #     items: [
  #       new Rx.BehaviorSubject '1'
  #       new Rx.BehaviorSubject '2'
  #       new Rx.BehaviorSubject '3'
  #       new Rx.BehaviorSubject '4'
  #       new Rx.BehaviorSubject '5'
  #    ]
->
  # class LifetimeSubject extends Rx.BehaviorSubject
  #   dispose: ->
  #     @onCompleted()
  #     super

  # class LifetimeCombinator extends Rx.Subject

  #   constructor: ->
  #     @lifetimes = []
  #     super

  #   subscribe: (observerOrOnNext) ->
  #     subscription = super
  #     # dispose of dead lifetimes
  #     toDispose = (lifetime for lifetime in @lifetimes when lifetime.isDisposed)
  #     @lifetimes.splice @lifetimes.indexOf(lifetime), 1 for lifetime in toDispose
  #     # replay living lifetimes to new observer
  #     onNext = if typeof observerOrOnNext is 'function' then observerOrOnNext else observerOrOnNext.onNext
  #     onNext lifetime for lifetime in @lifetimes when !lifetime.isDisposed

  #     subscription

  #   onNext: (lifetime) ->
  #     @lifetimes.push lifetime
  #     super

  # $ ->

  #   comb.subscribe (x) ->


  #   # console.log key for key of comb

  #   s1 = comb.subscribe (s) ->
  #       dom = $('<li>').appendTo '#s1'
  #       s.subscribe(
  #         (x) -> dom.text x
  #         (err) -> console.log 'error', e
  #         -> dom.hide(500).queue ->
  #           dom.remove()
  #         )

  #   comb.onNext a = new LifetimeSubject 'A'
  #   comb.onNext b = new LifetimeSubject 'B'

  #   s2 = comb.subscribe (s) ->
  #       dom = $('<li>').appendTo '#s2'
  #       s.subscribe(
  #         (x) -> dom.text x
  #         (err) -> console.log 'error', e
  #         -> dom.hide(1500).queue ->
  #           dom.remove()
  #         )

  #   Rx.Observable.interval(100).subscribe (x) -> b.onNext "B#{x}"

  #   a.onNext 'A.1'
  #   a.dispose()

  #   comb.onNext c = new LifetimeSubject 'C'
  #   comb.onNext d = new LifetimeSubject 'D'
  #   comb.onNext e = new LifetimeSubject 'E'

  #   Rx.Observable.returnValue(c).delay(2000).subscribe (x) -> x.dispose()

  #   s3 = comb.subscribe (s) ->
  #       dom = $('<li>').appendTo '#s3'
  #       s.subscribe(
  #         (x) -> dom.text x
  #         (err) -> console.log 'error', e
  #         -> dom.hide(1000).queue ->
  #           dom.remove()
  #         )

# class Dictionary
#   constructor: ->
#     @keys = []
#     @values = []
#     @objs = []

#   get: (key) ->
#     @objs[@keys.indexOf key]

#   set: (key, value) ->
#     if obj = @get key
#       obj.value = value
#       return obj

#     obj =
#       key: key
#       value: value
  
#     @keys.push key
#     @values.push value
#     @objs.push obj
#     obj

#   remove: (key) ->
#     return false if index = @keys.indexOf(key) is -1
#     @keys.splice index, 1
#     @values.splice index, 1
#     @objs.splice index, 1
#     true

# class LifetimeSubject extends Rx.BehaviorSubject
#   dispose: ->
#     @onCompleted()
#     super

# Rx.Observable::bindResource = (factory) ->
#   source = @
#   Rx.Observable.create (observer) ->
#     source.subscribe (lifetime) ->
#       resource = factory lifetime
#       observer.onNext
#         lifetime: lifetime
#         resource: resource
#         dispose: ->
#           lifetime.dispose()
#           resource.dispose()

# # comparer : (a, a) -> Number
# #     sort : (a, a) -> _
# # selector : (*)    -> a
# Rx.Observable::sort = (comparer, sort, selector) ->

#   selector ?= (x) -> x

#   Rx.Observable.create (observer) ->
#     source.subscribe (value) ->


# Rx.Observable::sortResource = (comparer, sort) ->
#   source = @

#   items = new Dictionary

#   Rx.Observable.create (o) ->
#     source.subscribe (s) ->
#       s.lifetime.subscribe(
#         (x) ->
#           item = items.set s, x
#         (err) ->
#         -> 
#         )
#       o.onNext s

# $ ->

#   createDom = (lifetime) ->
#     dom = $('<div>').appendTo 'body'
#     dom.dispose = ->
#       dom.remove()

#     lifetime.subscribe(
#       (x) -> dom.text x
#       (err) ->
#       -> dom.remove()
#       )

#     dom

#   numbers = new Rx.Subject

#   numbers
#     .bindResource(createDom)
#     .sortResource(
#       (a, b) -> a > b # source return -1, 0, or 1
#       (r, after) ->
#         return r.insertAfter after if after
#         r.appendTo 'body' 
#       )
#     .subscribe (x) ->

#   numbers.onNext a = new LifetimeSubject 1
#   numbers.onNext b = new LifetimeSubject 2
#   numbers.onNext c = new LifetimeSubject 3
#   numbers.onNext c = new LifetimeSubject 4
#   numbers.onNext c = new LifetimeSubject 5
#   numbers.onNext c = new LifetimeSubject 6

#   Rx.Observable.interval(500).subscribe (x) -> a.onNext x

class ObservableArray

  constructor: ->
    @keys = []
    @values = []

  push: (value) ->



$ ->





















  