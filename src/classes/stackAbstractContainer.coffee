class StackAbstractContainer extends StackElement
  constructor: (options) ->
    super options
    @_children = []
    @_updating = false

  renderTo: (_parentEl) ->
    super _parentEl
    @beginUpdate()
    for child in @_children
      child.renderTo @_el
    @endUpdate()

  addChild: (child) ->
    @_children.push child
    child.onHeightChanged => @_childHeightChanged true
    child

  _arrange: (animate) -> throw new Error 'Not Implemented'

  _childHeightChanged: (animate) ->
    @_arrange(animate) unless @_updating

  beginUpdate: ->
    @_updating = true

  endUpdate: ->
    @_updating = false
    @_childHeightChanged false
