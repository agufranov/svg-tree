class StackHtmlElement extends StackElement
  constructor: (@content, options) ->
    super options

  getDefaultOptions: -> _.merge super(), htmlPadding: 10, htmlWidth: null, htmlWrapperClass: 'content-wrapper'

  renderTo: (_parentEl) ->
    super _parentEl
    @_rect = @_el.rect().stroke(dasharray: @options.htmlStrokeDasharray)
    @_foreignObject = @_el.foreignObject()
    @_renderContents()

  _renderContents: ->
    wrapper = $('<div>')
      .addClass @options.htmlWrapperClass
      .addClass @options.htmlWrapperAdditionalClass
      .css padding: @options.htmlPadding, float: 'left', width: @options.htmlWidth
      .data 'stack-element', @
      .html @content
      .get 0

    foNode = @_foreignObject.node
    foNode.removeChild(foNode.firstChild) while foNode.firstChild
    foNode.appendChild wrapper
    wrapperSize = [ $(wrapper).width(), $(wrapper).outerHeight() ]
    @_rect.size wrapperSize...
    @_foreignObject.size wrapperSize...
    @_fireHeightChanged()

  updateContent: (content) ->
    @content = content
    @_renderContents()
