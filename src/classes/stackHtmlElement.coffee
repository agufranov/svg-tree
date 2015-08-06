class SVGTree.StackHtmlElement extends SVGTree.StackElement
  constructor: (@content, options) ->
    super options
    @__wrapperEventHandlers = []
    @prepended = []
    @appended = []

  getDefaultOptions: -> _.extend super(), htmlPadding: 10, htmlWidth: null, htmlWrapperClass: 'content-wrapper', htmlRect: true, htmlRectStrokeColor: 'gray', htmlRectStrokeWidth: 1, htmlRectFill: '#EEF', htmlMinHeight: 30

  renderTo: (_parentEl) ->
    super _parentEl
    @_rect = @_el.rect().stroke(color: @options.htmlRectStrokeColor, width: @options.htmlRectStrokeWidth, dasharray: @options.htmlRectStrokeDasharray).fill(@options.htmlRectFill) if @options.htmlRect
    @_foreignObject = @_el.foreignObject()
    @_renderContents false

  _renderContents: (animate) ->
    if not @_wrapper
      @_wrapper = $('<div>')
        .addClass @options.htmlWrapperClass
        .addClass @options.htmlWrapperAdditionalClass
        .css padding: @options.htmlPadding, float: 'left', width: @options.htmlWidth - 2 * @options.htmlPadding, 'min-height': @options.htmlMinHeight
        .data 'stack-element', @
        .get 0

    innerWrapper = $('<div>').addClass('stack-html-inner-wrapper')
    innerWrapper.html @content
    $(@_wrapper).html innerWrapper

    for el in @prepended
      innerWrapper.before el

    for el in @appended
      $(@_wrapper).append el

    # Hackish
    $(@_wrapper).appendTo document.body
    wrapperSize = [ $(@_wrapper).outerWidth(), $(@_wrapper).outerHeight() ]
    $(@_wrapper).remove()

    foNode = @_foreignObject.node
    foNode.removeChild(foNode.firstChild) while foNode.firstChild
    foNode.appendChild @_wrapper
    for eventHandler in @__wrapperEventHandlers
      $(@_wrapper).on eventHandler...
    # wrapperSize = [ $(@_wrapper).outerWidth(), $(@_wrapper).outerHeight() ]
    @height = wrapperSize[1]
    @_animate(@_rect, animate).size(wrapperSize...) if @options.htmlRect
    @_animate(@_foreignObject, animate).size(wrapperSize...)
    @_fireHeightChanged()

  getHeight: -> @height

  updateContent: (content) ->
    @content = content
    @_renderContents true

  on: (args...) ->
    if @_wrapper
      $(@_wrapper).on args...
    else
      @__wrapperEventHandlers.push args
