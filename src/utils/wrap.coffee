#import core.globals

sx.utils.wrap = (valueOrBehavior) ->
  if typeof valueOrBehavior.subscribe is 'function'
    return valueOrBehavior

  new Rx.BehaviorSubject valueOrBehavior