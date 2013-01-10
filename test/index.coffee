$ ->

  class Vm
    constructor: (name, dob) ->
      @name = new Rx.BehaviorSubject name || 'no name'
      @dob  = new Rx.BehaviorSubject dob  || new Date
      @age  = Rx.Observable.interval(1).select => (new Date - @dob.value) / 1000 / 60 / 60 / 24 / 365

  vm = new Vm 'Christopher Harris', new Date '11/11/1989'

  # Rx.Observable.interval(1000).select(->new Date).subscribe vm.dob

  sx.bind vm

  # binders = binding factory
