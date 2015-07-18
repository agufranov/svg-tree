class StackHtmlDepElement extends StackElement
  # TODO Refactor and arrow
  constructor: (@content1, @content2, options) ->
    super options
    htmlOptions = _.merge htmlWidth: @options.depWidth, htmlWrapperAdditionalClass: 'dep-wrapper', @options
    @c1 = new StackHtmlElement @content1, _.merge htmlStrokeDasharray: @options.depDasharray, htmlOptions
    @c2 = new StackHtmlElement @content2, htmlOptions

  getDefaultOptions: -> _.merge super(), depMargin: 30, depDasharray: '10 5'

  renderTo: (_parentEl) ->
    super _parentEl
    @g = @_el.group()
    @c1.renderTo @g
    @c2.renderTo @g
    @_arrangeDep()
    @c1.onHeightChanged @_arrangeDep.bind @
    @c2.onHeightChanged @_arrangeDep.bind @

    @c1.dep = @c2.dep = @ # debug, breaks on html el update
    # TODO think how to bind to dom rightly

  _arrangeDep: ->
    diff = (@c1.getHeight() - @c2.getHeight()) / 2
    @c1.moveTo 0, null
    @c2.moveTo @options.depWidth + @options.depMargin, null
    if @options.depIgnoreDepHeight or @c1.getHeight() > @c2.getHeight()
      @c1.moveTo null, 0
      @c2.moveTo null, diff
    else
      @c1.moveTo null, -diff
      @c2.moveTo null, 0
    @_drawArrow()
    @_fireHeightChanged()

  getHeight: -> if @options.depIgnoreDepHeight then @c1.getHeight() else Math.max(@c1.getHeight(), @c2.getHeight())

  _drawArrow: ->
    h2 = @getHeight() / 2
    points = [@options.depWidth, h2, @options.depWidth + @options.depMargin, h2]
    if not @_arrow
      @_arrow = @g.line(points...).addClass(@options.depLineClass)
    else
      @_arrow.plot(points...)
