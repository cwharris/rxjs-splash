#import core.globals

sx.utils.bind = (obsOrValue, obsOrCallback) ->

  if typeof obsOrValue.subscribe is 'function'
    return obsOrValue.subscribe obsOrCallback

  if typeof obsOrCallback.onNext is 'function'
    obsOrCallback.onNext obsOrValue
  else
    obsOrCallback obsOrValue

  noDispose