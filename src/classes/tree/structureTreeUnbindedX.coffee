class StructureTreeUnbindedX extends StackElement
  renderTo: (_parentEl) ->
    super _parentEl
    @_el.text('x').stroke(color: 'red', width: 0.3)
    size = @_el.node.getBBox()
    @_el.dx @options.xMargin - size.width / 2
    @height = size.height * 2

  getHeight: -> @height
