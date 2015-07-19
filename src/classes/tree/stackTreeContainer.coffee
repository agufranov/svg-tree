class StackTreeContainer extends StackContainer
  # TODO Maybe get out the code which is binded with data implementation details (i.e. deps)
  # TODO 0-level child margin should be greater as on photo
  # TODO Parent SVG resizing
  # TODO [DONE] Animate (change lines to polylines)
  # TODO [DONE] Dep element right arranging
  constructor: (@data, @dataAccessors, @_headerProviderClass, options, @depth = 0) ->
    super options
    @_headerProvider = new @_headerProviderClass @
    @options.groupChildMargin = @options.treeNestedMargin
    @collapsed = false
    @__collapsedCallbacks = []

    # Create header
    @_headerComponent = @_headerProvider.createHeader()
    @_headerComponent.tree = @ # debug
    # TODO think how to bind to dom rightly
    @addChild @_headerComponent

    # Create children
    childrenData = @dataAccessors.getChildrenArray @data
    if childrenData
      @_treeChildrenComponent = @addChild new StackContainer groupChildMargin: @options.treeFlatMargin, animationDuration: @options.animationDuration
      @_childTrees = []
      for i in [0...childrenData.length]
        childData = childrenData[i]
        childOpts = @options

        # If tree has right side & has such surrounding trees, we need to consider its right side height
        if @dataAccessors.isDep(childData) and ((i < childrenData.length - 1 and @dataAccessors.isDep(childrenData[i + 1])) or (i > 0 and @dataAccessors.isDep(childrenData[i - 1])))
          childOpts = _.merge { treeDepHasSurroundingDeps: true }, @options

        childTree = new StackTreeContainer(childData, @dataAccessors, @_headerProviderClass, childOpts, @depth + 1)
        @_treeChildrenComponent.addChild childTree
        @_childTrees.push childTree

  getDefaultOptions: -> _.merge super(), treeFlatMargin: 20, treeNestedMargin: 5, treeDepthShift: 30, treeWidth: 300, treeParentLineMargin: 10, treeLineClass: 'tree-line'

  renderTo: (_parentEl) ->
    super _parentEl
    # Shift subtree
    if @_treeChildrenComponent
      @_treeChildrenComponent.moveBy @options.treeDepthShift, 0

  collapsible: -> @dataAccessors.getChildrenArray(@data)?.length > 0 and @depth > 0

  toggleCollapse: ->
    return unless @collapsible()
    @collapsed = not @collapsed
    @_fireCollapsed()
    return unless @_treeChildrenComponent
    @_treeChildrenComponent.fadeToggle => @_arrange true

  _arrange: (animate) ->
    super animate
    # Draw child line if is children
    @_drawChildLine animate if @depth > 0
    # Draw parent line if has children
    @_drawParentLine animate if @_treeChildrenComponent

  _drawChildLine: (animate) ->
    h = @_headerComponent.getHeight() / 2
    d = @options.treeDepthShift - @options.treeParentLineMargin
    points = [[0, h], [-d, h]]
    if not @_childLine
      @_childLine = @_headerComponent._el.polyline(points).addClass(@options.treeLineClass)
    else
      @_animate(@_childLine, animate).plot(points)
    
  _drawParentLine: (animate) ->
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

    points = [[-d, -@options.treeNestedMargin], [-d, h]]
    if not @_parentLine
      @_parentLine = @_treeChildrenComponent._el.polyline(points).addClass(@options.treeLineClass)
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
        depLineClass: @tree.options.treeLineClass
    else
      if @tree.collapsible()
        header = new StackHtmlElementWithCollapser @tree.dataAccessors.getContent(@tree.data), @tree,
          animationDuration: @tree.options.animationDuration
          htmlWidth: @tree.options.treeWidth - @tree.options.treeDepthShift * @tree.depth
      else
        header = new StackHtmlElement @tree.dataAccessors.getContent(@tree.data),
          animationDuration: @tree.options.animationDuration
          htmlWidth: @tree.options.treeWidth - @tree.options.treeDepthShift * @tree.depth
      if @tree.depth is 0 and (additionalContent = @tree.dataAccessors.getRootHeaderAdditionalContent(@tree.data))
        h = new StackVerticalContainer
          animationDuration: @tree.options.animationDuration
          vertMargin: @tree.options.treeWidth
        # new StackHtmlElement '<h1>[root]</h1>' + @tree.dataAccessors.getContent(@tree.data),
        #   animationDuration: @tree.options.animationDuration
        #   htmlWidth: @tree.options.treeWidth - @tree.options.treeDepthShift * @tree.depth
        headerAddition = new StackHtmlElement additionalContent,
          animationDuration: @tree.options.animationDuration
          htmlWidth: @tree.options.treeWidth
          htmlRect: false
          ignoreHeight: true

        # debug
        header.prepended.push '<div>1</div>'
        header.prepended.push '<div>2</div>'
        header.appended.push '<div>3</div>'
        header.appended.push '<div>4</div>'
        f = ->
          randh = -> "<div style='height: #{Math.round(Math.random() * 5) * 50}px'>A</div>"
          header.updateContent randh()
          headerAddition.updateContent randh()
        header.on 'click', f
        headerAddition.on 'click', f

        h.addChild header
        h.addChild headerAddition
        h
      else
        header
