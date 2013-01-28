#import core.globals

sx.utils.bind = (obsOrValue, callback) ->

  if obsOrValue.subscribe
    return obsOrValue.subscribe callback

  callback obsOrValue
  noDispose