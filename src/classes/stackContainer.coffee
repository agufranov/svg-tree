class SVGTree.StackContainer extends SVGTree.StackAbstractContainer
  constructor: (options) ->
    super options
    @_children = []
    @_updating = false

  getDefaultOptions: -> _.extend super(), groupChildMargin: 5

  getHeight: -> @height

  _arrange: (animate) ->
    heightAcc = 0
    if @_children.length is 0
      @height = heightAcc
      return
    for child, index in @_children
      unless child.ignoreHeight()
        child.moveTo null, heightAcc, animate
        heightAcc += child.getHeight()
        heightAcc += @options.groupChildMargin
    heightAcc -= @options.groupChildMargin
    @height = heightAcc
    @_fireHeightChanged()
