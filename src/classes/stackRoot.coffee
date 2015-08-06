class SVGTree.StackRoot extends SVGTree.StackContainer
  _childHeightChanged: (animate) ->
    super animate
    @_resizeSvgContainer()

  _resizeSvgContainer: ->
    @_parentEl.height @getHeight()
