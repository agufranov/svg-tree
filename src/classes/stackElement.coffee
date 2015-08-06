class SVGTree.StackElement
  constructor: (@options = {}) ->
    _.defaults @options, @getDefaultOptions()
    @__heightChangedCallbacks = []

  getDefaultOptions: -> animationDuration: 500

  moveTo: (x, y, animate = false) ->
    el = @_animate @_el, animate
    if x isnt null
      if y isnt null
        el.move x, y
      else
        el.x x
    else
      if y isnt null
        el.y y
      else
        throw new Error 'x either y must be not null'
    @

  moveBy: (x, y, animate = false) ->
    el = @_animate @_el, animate
    el.dmove x, y
    @

  getHeight: -> @_el.node.getBBox().height

  renderTo: (@_parentEl) ->
    @_el = @_createEl().addClass(@__proto__.constructor.name)

  _createEl: -> @_parentEl.group()

  visible: -> @_el.visible()
  show: -> @_el.show()
  hide: -> @_el.hide()
  toggle: -> if @visible() then @hide() else @show()

  fadeIn: (cb) ->
    @_el.show()
    # This hack is needed for animation to work
    setTimeout =>
      @_animate(@_el, true).opacity(1).after =>
        cb() if cb
    , 0

  fadeOut: (cb) ->
    @_animate(@_el, true).opacity(0).after =>
      @_el.hide()
      cb() if cb

  fadeToggle: (cb) ->
    if @visible()
      @fadeOut(cb)
    else
      @fadeIn()
      cb() if cb

  ignoreHeight: -> @options.ignoreHeight or not @visible()

  _animate: (svg, animate) ->
    if animate then svg.animate(@options.animationDuration) else svg

  # Events
  onHeightChanged: (cb) ->
    @__heightChangedCallbacks.push cb

  _fireHeightChanged: ->
    cb @, @getHeight() for cb in @__heightChangedCallbacks
