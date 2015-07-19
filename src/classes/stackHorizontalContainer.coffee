class StackVerticalContainer extends StackAbstractContainer
  constructor: (options) ->
    super options

  getDefaultOptions: -> _.merge super(), vertMargin: 200

  getHeight: -> @height

  _arrange: (animate) ->
    maxChildHeight = 0
    if @_children.length is 0
      @height = 0
      return
    @height = _.max(_.filter(@_children, (child) -> not child.ignoreHeight()), (child) -> child.getHeight()).getHeight()
    @_fireHeightChanged() # check with comment
    w = 0
    for child in @_children
      childHeight = (@height - child.getHeight()) / 2
      child.moveTo w, childHeight, animate
      w += if _.isArray(@options.vertMargin) then @options.vertMargin.unshift() else @options.vertMargin
