sx.utils.toJS = (obj) ->
  JSON.stringify obj, (s, field) ->
    return field.values if field instanceof sx.ObservableArray
    return field.value if field instanceof Rx.Observable
    return undefined if field instanceof Rx.Observer
    field