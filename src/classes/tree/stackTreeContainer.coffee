class StackTreeContainer extends StackContainer
  # TODO Maybe get out the code which is binded with data implementation details (i.e. deps)
  # TODO 0-level child margin should be greater as on photo
  # TODO [DONE] Parent SVG resizing
  # TODO [DONE] Animate (change lines to polylines)
  # TODO [DONE] Dep element right arranging
  constructor: (@data, @dataAccessors, @_headerProviderClass, options, @depth = 0) ->
    super options
    @options.groupChildMargin = if @depth is 0 then @options.treeRootNestedMargin else @options.treeNestedMargin
    @_headerProvider = new @_headerProviderClass @
    @collapsed = false
    @__collapsedCallbacks = []

    # Create header
    @_headerComponent = @_headerProvider.createHeader()
    @_headerComponent.tree = @ # debug
    # TODO think how to bind to dom rightly
    @addChild @_headerComponent


    # Create children
    childrenData = @dataAccessors.getChildrenArray @data
    unbindedData = @dataAccessors.getUnbindedArray @data
    @_rootLineToEnd = !!unbindedData
    if _.any(childrenData) or _.any(unbindedData)
      @_treeAllChildrenComponent = @addChild new StackContainer groupChildMargin: 0, animationDuration: @options.animationDuration
      if _.any(childrenData)
        @_treeOwnChildrenComponent = @_treeAllChildrenComponent.addChild new StackContainer groupChildMargin: @options.treeFlatMargin, animationDuration: @options.animationDuration
        @_childTrees = []
        @_addTrees childrenData, @_childTrees, @_treeOwnChildrenComponent

      if _.any(unbindedData)
        @_unbindedTrees = []
        @_treeAllChildrenComponent.addChild new StructureTreeUnbindedX xMargin: -(@options.treeDepthShift - @options.treeParentLineMargin), animationDuration: @options.animationDuration
        @_treeUnbindedChildrenComponent = @_treeAllChildrenComponent.addChild new StackContainer groupChildMargin: 0, animationDuration: @options.animationDuration
        @_treeUnbindedChildrenComponent.addChild new StackHtmlElement "<div style='width: #{@options.treeWidth - @options.treeDepthShift}px; text-align: right; font-size: 12px; margin-bottom: 5px; color: red;'>unbinded</div>", htmlRect: false, htmlWidth: @options.treeWidth - @options.treeDepthShift, htmlMinHeight: null, htmlPadding: 0, animationDuration: @options.animationDuration
        @_treeUnbindedChildrenTreesComponent = @_treeUnbindedChildrenComponent.addChild new StackContainer groupChildMargin: @options.treeFlatMargin, animationDuration: @options.animationDuration
        @_addTrees unbindedData, @_unbindedTrees, @_treeUnbindedChildrenTreesComponent, treeDrawChildLine: false, treeRectFill: @options.treeUnbindedRectFill, treeRectStrokeColor: @options.treeUnbindedRectStrokeColor, treeRectStrokeDasharray: @options.treeUnbindedRectStrokeDasharray

  _addTrees: (childrenData, arrayToStore, container, options) ->
    for i in [0...childrenData.length]
      childData = childrenData[i]
      childOpts = _.clone @options
      _.extend childOpts, treeDrawChildLine: true
      # If tree has right side & has such surrounding trees, we need to consider its right side height
      if @dataAccessors.isDep(childData) and ((i < childrenData.length - 1 and @dataAccessors.isDep(childrenData[i + 1])) or (i > 0 and @dataAccessors.isDep(childrenData[i - 1])))
        _.extend childOpts, { treeDepHasSurroundingDeps: true }
      _.extend childOpts, options
      childTree = new StackTreeContainer(childData, @dataAccessors, @_headerProviderClass, childOpts, @depth + 1)
      container.addChild childTree
      arrayToStore.push childTree

  getDefaultOptions: -> _.extend super(), treeFlatMargin: 20, treeNestedMargin: 5, treeRootNestedMargin: 50, treeDepthShift: 30, treeWidth: 300, treeParentLineMargin: 10, treeDrawChildLine: true, treeLineStroke: 'gray', treeUnbindedLineStroke: 'red', treeRectFill: '#EEF', treeRectStrokeColor: 'gray', treeStrokeDasharray: 'none', treeUnbindedRectFill: '#FFA', treeUnbindedRectStrokeColor: 'red', treeUnbindedRectStrokeDasharray: '10 5'

  renderTo: (_parentEl) ->
    super _parentEl
    # Shift subtree
    if @_treeAllChildrenComponent
      @_treeAllChildrenComponent.moveBy @options.treeDepthShift, 0

  collapsible: -> @dataAccessors.getChildrenArray(@data)?.length > 0 and @depth > 0

  toggleCollapse: ->
    return unless @collapsible()
    @collapsed = not @collapsed
    @_fireCollapsed()
    return unless @_treeOwnChildrenComponent
    @_treeAllChildrenComponent.fadeToggle => @_arrange true

  _arrange: (animate) ->
    super animate
    # Draw child line if is children
    @_drawChildLine animate if @options.treeDrawChildLine and @depth > 0
    # Draw parent line if has children
    @_drawParentLine animate if @_treeOwnChildrenComponent
    # Draw unbinded line if has unbinded
    @_drawUnbindedLine animate if @_treeUnbindedChildrenComponent

  _drawUnbindedLine: (animate) ->
    d = @options.treeDepthShift - @options.treeParentLineMargin
    h = @_treeUnbindedChildrenComponent.getHeight()

    points = [[-d, 0], [-d, h]]
    if not @_unbindedLine
      @_unbindedLine = @_treeUnbindedChildrenComponent._el.polyline(points).stroke(@options.treeUnbindedLineStroke)
    else
      @_animate(@_unbindedLine, animate).plot(points)

  _drawChildLine: (animate) ->
    h = @_headerComponent.getHeight() / 2
    d = @options.treeDepthShift - @options.treeParentLineMargin
    points = [[0, h], [-d, h]]
    if not @_childLine
      @_childLine = @_headerComponent._el.polyline(points).stroke(@options.treeLineStroke)
    else
      @_animate(@_childLine, animate).plot(points)
    
  _drawParentLine: (animate) ->
    # Calculate parent line height
    h = 0
    if @_childTrees.length > 1
      for childTree in @_childTrees[0..@_childTrees.length - 2]
        h += childTree.getHeight() + @options.treeFlatMargin

    # TODO Refactor line continuation
    if @_rootLineToEnd and @depth is 0
      h += @_childTrees[@_childTrees.length - 1].getHeight()
    else
      h += @_childTrees[@_childTrees.length - 1]._headerComponent.getHeight() / 2

    d = @options.treeDepthShift - @options.treeParentLineMargin

    points = [[-d, -@options.groupChildMargin], [-d, h]]
    if not @_parentLine
      @_parentLine = @_treeOwnChildrenComponent._el.polyline(points).stroke(@options.treeLineStroke)
    else
      @_animate(@_parentLine, animate).plot(points)

  # Events
  onCollapsed: (cb) ->
    @__collapsedCallbacks.push cb

  _fireCollapsed: (args...) ->
    cb @, @collapsed for cb in @__collapsedCallbacks

class StackTreeHeaderProvider
  constructor: (@tree) ->

  createHeader: ->
    if @tree.dataAccessors.isDep @tree.data
      new StackHtmlDepElement @tree.dataAccessors.getContent(@tree.data), @tree.dataAccessors.getDepContent(@tree.data),
        animationDuration: @tree.options.animationDuration
        depMainWidth: @tree.options.treeWidth
        depWidth: @tree.options.treeWidth - @tree.options.treeDepthShift * @tree.depth
        depIgnoreDepHeight: not @tree.options.treeDepHasSurroundingDeps
        depDasharray: @tree.options.treeDepDasharray
        depLineStroke: @tree.options.treeLineStroke
    else
      if @tree.collapsible()
        header = new StackHtmlElementWithCollapser @tree.dataAccessors.getContent(@tree.data), @tree,
          animationDuration: @tree.options.animationDuration
          htmlWidth: @tree.options.treeWidth - @tree.options.treeDepthShift * @tree.depth
          htmlRectFill: @tree.options.treeRectFill
          htmlRectStrokeColor: @tree.options.treeRectStrokeColor
          htmlRectStrokeDasharray: @tree.options.treeRectStrokeDasharray
      else
        header = new StackHtmlElement @tree.dataAccessors.getContent(@tree.data),
          animationDuration: @tree.options.animationDuration
          htmlWidth: @tree.options.treeWidth - @tree.options.treeDepthShift * @tree.depth
          htmlRectFill: @tree.options.treeRectFill
          htmlRectStrokeColor: @tree.options.treeRectStrokeColor
          htmlRectStrokeDasharray: @tree.options.treeRectStrokeDasharray
      if @tree.depth is 0 and not @tree.dataAccessors.hasDeps(@tree.data)
        h = new StackVerticalContainer
          animationDuration: @tree.options.animationDuration
          vertMargin: @tree.options.treeWidth
        # new StackHtmlElement '<h1>[root]</h1>' + @tree.dataAccessors.getContent(@tree.data),
        #   animationDuration: @tree.options.animationDuration
        #   htmlWidth: @tree.options.treeWidth - @tree.options.treeDepthShift * @tree.depth
        headerAddition = new StackHtmlElement  '<span class="root-header-addition">There are no service dependencies</span>',
          animationDuration: @tree.options.animationDuration
          htmlWidth: @tree.options.treeWidth
          htmlRect: false
          ignoreHeight: true

        h.addChild header
        h.addChild headerAddition
        h
      else
        header
