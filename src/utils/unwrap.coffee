#import core.globals

sx.utils.unwrap = (valueOrBehavior) ->
  if valueOrBehavior.value and valueOrBehavior.subscribe
    return valueOrBehavior.value 
  valueOrBehavior