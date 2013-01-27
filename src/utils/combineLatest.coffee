sx.utils.combineLatest = ->
  args = Array.prototype.slice.call arguments
  args.push -> arguments
  source = args.shift()
  Rx.Observable.prototype.combineLatest.apply source, args
