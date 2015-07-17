class StackElement
  constructor: (@options = {}) ->
    _.defaults @options, @getDefaultOptions()
    @__heightChangedCallbacks = []

  getDefaultOptions: -> {}

  moveTo: (x, y) ->
    @_el.move x, y
    @

  moveBy: (x, y) ->
    @_el.dmove x, y
    @

  getHeight: -> @_el.node.getBBox().height

  renderTo: (@parentEl) ->
    @_el = @_createEl()

  _createEl: -> @parentEl.group()

  # Events
  onHeightChanged: (cb) ->
    @__heightChangedCallbacks.push cb

  fireHeightChanged: ->
    cb @, @getHeight() for cb in @__heightChangedCallbacks
