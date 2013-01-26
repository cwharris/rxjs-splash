#import core.globals

sx.bind = (vm, target) ->
  target = $ (target or window.document.body)
  sx.internal.bind
    vm: vm
    vmRoot: vm
    vmParent: undefined
    target: target