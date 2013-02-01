sx.computed = (options) ->

  Rx.Observable.create (o) ->
    sx.utils.combine(options.params)
      .select(options.read)
      .subscribe o