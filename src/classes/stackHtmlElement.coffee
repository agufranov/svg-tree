class StackHtmlElement extends StackElement
  constructor: (@content, options) ->
    super options

  getDefaultOptions: -> _.merge super(), htmlPadding: 10, htmlWidth: null, htmlWrapperClass: 'content-wrapper'

  renderTo: (_parentEl) ->
    super _parentEl
    @_rect = @_el.rect().stroke(dasharray: @options.htmlStrokeDasharray)
    @_foreignObject = @_el.foreignObject()
    @_renderContents false

  _renderContents: (animate) ->
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
    @height = wrapperSize[1]
    @_animate(@_rect, animate).size(wrapperSize...)
    @_animate(@_foreignObject, animate).size(wrapperSize...)
    @_fireHeightChanged()

  getHeight: -> @height

  updateContent: (content) ->
    @content = content
    @_renderContents true
