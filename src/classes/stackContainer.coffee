class StackContainer extends StackElement
  constructor: (options) ->
    super options
    @_children = []
    @_updating = false

  getDefaultOptions: -> _.merge super(), groupChildMargin: 5

  renderTo: (_parentEl) ->
    super _parentEl
    @beginUpdate()
    for child in @_children
      child.renderTo @_el
    @endUpdate()

  getHeight: -> @height

  addChild: (child) ->
    @_children.push child
    child.onHeightChanged @_childHeightChanged.bind @
    child

  _arrange: ->
    heightAcc = 0
    if not @_children.length
      @height = heightAcc
      return
    for child, index in @_children
      if child.visible()
        child.moveTo null, heightAcc
        heightAcc += child.getHeight()
        debugger if _.isNaN heightAcc
        heightAcc += @options.groupChildMargin if index < @_children.length - 1
    @height = heightAcc
    @_fireHeightChanged()

  _childHeightChanged: ->
    @_arrange() unless @_updating

  beginUpdate: ->
    @_updating = true

  endUpdate: ->
    @_updating = false
    @_childHeightChanged()

