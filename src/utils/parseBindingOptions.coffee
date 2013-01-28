sx.utils.parseBindingOptions = (param, options = {}) ->
  if typeof param is 'function' or param.onNext or param.subscribe
    options.source = param
    return options

  options[key] = value for key, value of param
  options