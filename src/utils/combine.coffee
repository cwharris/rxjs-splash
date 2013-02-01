sx.utils.combine = (sources) ->

  keys = []
  values = []

  for key, value of sources
    keys.push key
    values.push sx.utils.wrap value

  Rx.Observable.combineLatest values, ->
    params = {}
    params[key] = arguments[i] for key, i in keys
    params
