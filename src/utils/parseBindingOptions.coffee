sx.utils.parseBindingOptions = (param, options = {}) ->
  if typeof param is 'function' or typeof param.onNext is 'function' or typeof param.subscribe is 'function'
    options.source = param
    return options

  options.source = param.subject or param.action
  options[key] = value for key, value of param
  options