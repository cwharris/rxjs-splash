sx.computed = (options) ->

  keys = []
  values = []

  for key, value of options.params
    keys.push key
    values.push sx.utils.wrap value

  source = sx.utils.combineLatest(values).select (values) ->
    params = {}
    params[key] = values[i] for key, i in keys
    params

  Rx.Observable.create (o) -> source.select(options.read).subscribe o

sx.utils.combineLatest(values).select (values) ->