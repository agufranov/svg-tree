class SvgStackElement extends AbstractStackElement
  constructor: (options) -> super options
  moveTo: (x, y) ->
    @_el.move x, y
    @
  moveBy: (x, y) ->
    @_el.dmove x, y
    @
  getHeight: -> @_el.node.getBBox().height
  renderTo: (_parentEl) ->
    super _parentEl
    @_el = @_elFn @_parentEl
    @
  _elFn: (parentEl) -> parentEl.group()
