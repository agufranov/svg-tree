class StackHtmlElement extends StackElement
  constructor: (@content, options) ->
    super options
    @__wrapperEventHandlers = []

  getDefaultOptions: -> _.merge super(), htmlPadding: 10, htmlWidth: null, htmlWrapperClass: 'content-wrapper', htmlRect: true

  renderTo: (_parentEl) ->
    super _parentEl
    @_rect = @_el.rect().stroke(dasharray: @options.htmlStrokeDasharray) if @options.htmlRect
    @_foreignObject = @_el.foreignObject()
    @_renderContents false

  _renderContents: (animate) ->
    if not @_wrapper
      @_wrapper = $('<div>')
        .addClass @options.htmlWrapperClass
        .addClass @options.htmlWrapperAdditionalClass
        .css padding: @options.htmlPadding, float: 'left', width: @options.htmlWidth - 2 * @options.htmlPadding
        .data 'stack-element', @
        .get 0
      while @__wrapperEventHandlers.length > 0
        t = @__wrapperEventHandlers.shift()
        $(@_wrapper).on t.name, t.handler

    $(@_wrapper).html @content
    # @_wrapperPostProcess()

    foNode = @_foreignObject.node
    foNode.removeChild(foNode.firstChild) while foNode.firstChild
    foNode.appendChild @_wrapper
    wrapperSize = [ $(@_wrapper).outerWidth(), $(@_wrapper).outerHeight() ]
    @height = wrapperSize[1]
    @_animate(@_rect, animate).size(wrapperSize...) if @options.htmlRect
    @_animate(@_foreignObject, animate).size(wrapperSize...)
    @_fireHeightChanged()

  getHeight: -> @height

  # _wrapperPostProcess: ->
  #   $(@_wrapper).append $('<h3>').css(float: 'right').html('hi')

  updateContent: (content) ->
    @content = content
    @_renderContents true

  on: (eventName, eventHandler) ->
    if @_wrapper
      $(@_wrapper).on eventName, eventHandler
    else
      @__wrapperEventHandlers.push { name: eventName, handler: eventHandler }
