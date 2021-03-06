class SVGTree.StackHtmlElementWithCollapser extends SVGTree.StackHtmlElement
  constructor: (content, @tree, options) ->
    super content, options
    @appended.push $('<div>').addClass(@options.collapserWrapperClass)

    @on 'click', '.tree-header-collapser', (event) =>
      event.preventDefault()
      @tree.toggleCollapse()

    @on 'mousedown', (event) ->
      setTimeout ->
        window.getSelection().removeAllRanges()
      , 0

    @tree.onCollapsed =>
      @_updateCollapser()

  _renderContents: ->
    super()
    @_updateCollapser()

  getDefaultOptions: -> _.extend super(), collapsedTemplate: '<i class="fa fa-angle-double-down">', expandedTemplate: '<i class="fa fa-angle-double-up">', collapserWrapperClass: 'tree-header-collapser'

  _getCollapserTemplate: ->
    if @tree.collapsed then @options.collapsedTemplate else @options.expandedTemplate

  _updateCollapser: ->
    $(@_wrapper).find(".#{@options.collapserWrapperClass}").html @_getCollapserTemplate()
