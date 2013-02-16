sx = window.sx =
  utils: {}
  internal: {}
  binders: {}

noop = ->
noDispose = dispose: noop
identitySelect = (x) -> x