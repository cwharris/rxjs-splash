#import core.globals

sx.utils.wrap = (valueOrBehavior) ->
  if valueOrBehavior.value and valueOrBehavior.subscribe
    return valueOrBehavior
  new Rx.BehaviorSubject valueOrBehavior