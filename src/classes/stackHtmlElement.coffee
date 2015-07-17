class StackHtmlElement extends StackElement
  constructor: (@content, options) ->
    super options

  getDefaultOptions: -> _.merge super(), htmlPadding: 10, htmlWidth: null

  renderTo: (_parentEl) ->
    super _parentEl
    r = @_el.rect()
    f = @_el.foreignObject()
    wrapper = $('<div>')
      .addClass 'content-wrapper'
      .css padding: @options.htmlPadding, float: 'left', width: @options.htmlWidth
      .data 'stack-element', @
      .html @content
    f.appendChild wrapper[0]
    wrapperSize = [ wrapper.outerWidth(), wrapper.outerHeight() ]
    r.size wrapperSize...
    f.size wrapperSize...
    @_fireHeightChanged()
