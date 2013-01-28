class sx.ObservableArray extends Rx.Subject

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