class StackRoot extends StackContainer
  _childHeightChanged: (animate) ->
    super animate
    @_resizeSvgContainer()

  _resizeSvgContainer: ->
    @_parentEl.height @getHeight()
