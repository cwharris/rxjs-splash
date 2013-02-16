#import core.globals

sx.utils.unwrap = (valueOrBehavior) ->
  if typeof valueOrBehavior.subscribe is 'function'
    return valueOrBehavior.value 
  valueOrBehavior