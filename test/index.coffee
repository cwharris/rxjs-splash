$ ->

  class Vm
    constructor: (name, dob) ->
      @name = new Rx.BehaviorSubject name || 'no name'
      @dob  = new Rx.BehaviorSubject dob  || new Date
      @diff = Rx.Observable.interval(1).select => (new Date - @dob.value)
      @age  = @diff.select (x) -> x / 1000 / 60 / 60 / 24 / 365
      @isHighlighted = new Rx.BehaviorSubject false

    toggleHighlight: (vm, e) ->
      @isHighlighted.onNext not @isHighlighted.value


  vm = new Vm 'Christopher Harris', new Date '11/11/1989'

  sx.bind vm
  
