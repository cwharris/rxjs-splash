# import core.globals

sx.bind = (vm, target) ->
  target = $ (target or window.document.body)
  sx.internal.bind target, {
    vm: vm
    vmRoot: vm
    vmParent: undefined
  }