class StackTreeContainer extends StackContainer
  # TODO Maybe get out the code which is binded with data implementation details (i.e. deps)
  # TODO 0-level child margin should be greater as on photo
  # TODO Parent SVG resizing
  # TODO Animate (change lines to polylines)
  # TODO [DONE] Dep element right arranging
  constructor: (@data, @dataAccessors, options, @depth = 0) ->
    super options
    @options.groupChildMargin = @options.treeNestedMargin

    # Create header
    @_headerComponent = @_createHeaderComponent()
    @_headerComponent.tree = @ # debug
    # TODO think how to bind to dom rightly
    @addChild @_headerComponent

    # Create children
    childrenData = @dataAccessors.getChildrenArray @data
    if childrenData
      @_treeChildrenComponent = @addChild new StackContainer groupChildMargin: @options.treeFlatMargin
      @_childTrees = []
      for i in [0...childrenData.length]
        childData = childrenData[i]
        childOpts = @options

        # If tree has right side & has such surrounding trees, we need to consider its right side height
        if @dataAccessors.isDep(childData) and ((i < childrenData.length - 1 and @dataAccessors.isDep(childrenData[i + 1])) or (i > 0 and @dataAccessors.isDep(childrenData[i - 1])))
          childOpts = _.merge { treeDepHasSurroundingDeps: true }, @options

        childTree = new StackTreeContainer(childData, @dataAccessors, childOpts, @depth + 1)
        @_treeChildrenComponent.addChild childTree
        @_childTrees.push childTree

  getDefaultOptions: -> _.merge super(), treeFlatMargin: 20, treeNestedMargin: 5, treeDepthShift: 30, treeWidth: 300, treeParentLineMargin: 10, treeLineClass: 'tree-line'

  renderTo: (_parentEl) ->
    super _parentEl
    # Shift subtree
    if @_treeChildrenComponent
      @_treeChildrenComponent.moveBy @options.treeDepthShift, 0

  toggleCollapse: ->
    return unless @_treeChildrenComponent
    @_treeChildrenComponent.toggle()
    @_arrange()

  _arrange: ->
    super()
    # Draw child line if is children
    @_drawChildLine() if @depth > 0
    # Draw parent line if has children
    @_drawParentLine() if @_treeChildrenComponent

  _drawChildLine: ->
    h = @_headerComponent.getHeight() / 2
    d = @options.treeDepthShift - @options.treeParentLineMargin
    points = [0, h, -d, h]
    if not @_childLine
      @_childLine = @_headerComponent._el.line(points...).addClass(@options.treeLineClass)
    else
      @_childLine.plot(points...)
    
  _drawParentLine: ->
    # Calculate parent line height
    h = 0
    if @_childTrees.length > 1
      for childTree in @_childTrees[0..@_childTrees.length - 2]
        h += childTree.getHeight() + @options.treeFlatMargin

    # TODO Refactor line continuation
    if @options.treeRootLineToEnd and @depth is 0
      h += @_childTrees[@_childTrees.length - 1].getHeight()
    else
      h += @_childTrees[@_childTrees.length - 1]._headerComponent.getHeight() / 2

    d = @options.treeDepthShift - @options.treeParentLineMargin

    points = [-d, -@options.treeNestedMargin, -d, h]
    if not @_parentLine
      @_parentLine = @_treeChildrenComponent._el.line(points...).addClass(@options.treeLineClass)
    else
      @_parentLine.plot(points...)

  _createHeaderComponent: ->
    if @dataAccessors.isDep @data
      new StackHtmlDepElement @dataAccessors.getContent(@data), @dataAccessors.getDepContent(@data),
        depWidth: @options.treeWidth - @options.treeDepthShift * @depth
        depIgnoreDepHeight: not @options.treeDepHasSurroundingDeps
        depDasharray: @options.treeDepDasharray
        depLineClass: @options.treeLineClass
    else
      new StackHtmlElement @dataAccessors.getContent(@data),
        htmlWidth: @options.treeWidth - @options.treeDepthShift * @depth
