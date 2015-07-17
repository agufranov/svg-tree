class SvgStackNode extends SvgStackElement
  constructor: (options) ->
    super options
    @_children = []

  getDefaultOptions: -> _.merge super(), groupChildMargin: 5

  renderTo: (_parentEl) ->
    super _parentEl
    for child in @_children
      child.renderTo @_el
    @arrangeChildren()

  getHeight: -> @height

  addChild: (child) ->
    @_children.push child
    child

  arrangeChildren: ->
    heightAcc = 0
    return unless @_children.length
    for child, index in @_children
      child.moveTo 0, heightAcc
      heightAcc += child.getHeight()
      heightAcc += @options.groupChildMargin if index < @_children.length - 1
      debugger if _.isNaN heightAcc
    @height = heightAcc
