$ ->

  examples = $('#examples-source').children().map ->
      target = $(this)
      name: target.attr 'data-name'
      description: (target.attr 'data-description') or ''
      html: target
        .find('script[type="text/html"]')
        .html().trim()
      js: target
        .find('script[type="text/html/js"]')
        .html().trim()

  examples.each ->
    encodedHtml = $('<div>').text(this.html).html().trim()
    encodedJs = $('<div>').text(this.js).html().trim()
    target = $("""
      <div class="sx-example">
        <a href="#" class="sx-example-toggle icon-chevron-down pull-right"></a>
        <h4>#{this.name}</h4>
        <p>#{this.description}</p>
        <div class="well">#{this.html}</div>
        <div class="sx-example-code">
          <span>HTML</span>
          <pre>#{encodedHtml}</pre>
          <span>JavaScript</span>
          <pre>#{encodedJs}</pre>
        </div>
      </div>
      """)
      .appendTo '#examples'
    new Function(['target'], this.js).call(window, target);

  $('.sx-example').onAsObservable('click', '.sx-example-toggle')
    .doAction((e) -> e.preventDefault())
    .select((e) ->
      $(e.currentTarget)
        .closest('.sx-example')
        .find '.sx-example-code'
    )
    .subscribe (target) ->
      target.slideToggle()