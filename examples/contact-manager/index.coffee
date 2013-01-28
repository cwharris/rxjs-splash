class Contact
  constructor: (name='', email='')->
    @name = new Rx.BehaviorSubject name
    @email = new Rx.BehaviorSubject email
    @isSelected = new Rx.BehaviorSubject false
    @display = sx.computed
      params:
        name: @name
        email: @email
        time: Rx.Observable.interval(10).doAction(->console.log 'hot! check for leaks!')
      read: (params) ->
        params.name = params.name.trim()
        params.email = params.email.trim()
        return "#{params.name} <#{params.email}>" if params.name and params.email
        return "#{params.name}" if params.name
        return "#{params.email}" if params.email
        params.time.toString()

vm = 
  items: new ObservableArray
  remove: (data) -> vm.items.remove data
  select: (data) -> data.isSelected.onNext !data.isSelected.value
  add: ->
    contact = new Contact
    vm.items.push contact

$ ->
  sx.bind vm

  # a = Rx.Observable.interval(50)
  # b = Rx.Observable.interval(75)
  # c = Rx.Observable.interval(100)

  # Rx.Observable.combineLatest([a,b,c], ->arguments).subscribe (x) ->
  #   console.log x

  # args = [a, b, c]

  # args.push -> arguments
  # source = args.splice(1, 1)[0]
  # console.log source, args

  # console.log source, a
  
  # Rx.Observable.prototype.combineLatest
  #   .apply(source, args)
  #   .subscribe (x) -> console.log x

  # Rx.Observable.interval(250).combineLatest(a, b, c, -> arguments).sample(1000).subscribe (x) -> console.log x

  # Rx.Observable.interval(100).combineLatest(new Rx.BehaviorSubject('a'), ->arguments).subscribe (x) -> console.log x