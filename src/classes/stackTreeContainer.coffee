class StackTreeContainer extends StackContainer
  constructor: (@data, @depth = 0, options) ->
    super options
    @options.groupChildMargin = @options.treeNestedMargin
    @_headerComponent = @addChild new StackHtmlElement @data.c, htmlWidth: @options.treeWidth - @options.treeDepthShift * @depth
    @_headerComponent.tree = @
    if @data.d
      @_childrenComponent = @addChild new StackContainer groupChildMargin: @options.treeFlatMargin
      @_childTrees = (@_childrenComponent.addChild(new StackTreeContainer(childData, @depth + 1, options)) for childData in @data.d)

  getDefaultOptions: -> _.merge super(), treeFlatMargin: 20, treeNestedMargin: 5, treeDepthShift: 30, treeWidth: 300, treeParentLineMargin: 10, treeLineClass: 'tree-line'

  renderTo: (_parentEl) ->
    super _parentEl
    # Shift subtree
    if @_childrenComponent
      @_childrenComponent.moveBy @options.treeDepthShift, 0

    # Draw child line if is children
    if @depth > 0
      @_drawChildLine()

  _arrange: ->
    super()
    if @_childrenComponent
      # Draw parent line if has children
      @_drawParentLine()
    
  _drawParentLine: ->
    # Calculate parent line height
    h = 0
    if @_childTrees.length > 1
      for childTree in @_childTrees[0..@_childTrees.length - 2]
        h += childTree.getHeight() + @options.treeFlatMargin
    h += @_childTrees[@_childTrees.length - 1]._headerComponent.getHeight() / 2

    d = @options.treeDepthShift - @options.treeParentLineMargin

    if @_parentLine
      @_parentLine.plot(-d, -@options.treeNestedMargin, -d, h)
    else
      @_parentLine = @_childrenComponent._el.line(-d, -@options.treeNestedMargin, -d, h).addClass(@options.treeLineClass)

  _drawChildLine: ->
    h = @_headerComponent.getHeight() / 2
    d = @options.treeDepthShift - @options.treeParentLineMargin
    @_headerComponent._el.line(0, h, -d, h).addClass(@options.treeLineClass)

  toggleCollapse: ->
    return unless @_childrenComponent
    @_childrenComponent.toggle()
    @_arrange()
