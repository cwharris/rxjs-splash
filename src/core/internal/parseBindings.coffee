# import core.globals

sx.internal.parseBindings = (context) ->
  binding = context.target.attr 'data-splash'

  return null if not binding

  keys = ['$data', '$root', '$parent']
  values = [context.vm, context.vmRoot, context.vmParent]

  for key, value of context.vm
    keys.push key
    values.push value

  new Function(keys, "return { #{binding} };").apply(null, values);