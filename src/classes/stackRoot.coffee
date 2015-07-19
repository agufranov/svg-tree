class StackRoot extends StackContainer
  constructor: (@svgContainer, options) ->
    super options

  _childHeightChanged: (animate) ->
    super animate
    @_resizeSvgContainer()

  _resizeSvgContainer: ->
    @svgContainer.height @getHeight()
