class StackElement
  constructor: (@options = {}) ->
    _.defaults @options, @getDefaultOptions()
    @__heightChangedCallbacks = []

  getDefaultOptions: -> {}

  moveTo: (x, y) ->
    if x isnt null
      if y isnt null
        @_el.move x, y
      else
        @_el.x x
    else
      if y isnt null
        @_el.y y
      else
        throw new Error 'x either y must be not null'
    @

  moveBy: (x, y) ->
    @_el.dmove x, y
    @

  getHeight: -> @_el.node.getBBox().height

  renderTo: (@_parentEl) ->
    @_el = @_createEl()

  _createEl: -> @_parentEl.group()

  visible: -> @_el.visible()
  show: -> @_el.show()
  hide: -> @_el.hide()
  toggle: -> if @visible() then @hide() else @show()

  ignoreHeight: -> @options.ignoreHeight or not @visible()

  # Events
  onHeightChanged: (cb) ->
    @__heightChangedCallbacks.push cb

  _fireHeightChanged: ->
    cb @, @getHeight() for cb in @__heightChangedCallbacks
