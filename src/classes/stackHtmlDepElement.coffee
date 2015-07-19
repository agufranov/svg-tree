class StackHtmlDepElement extends StackElement
  # TODO Refactor and arrow
  constructor: (@content1, @content2, options) ->
    super options
    c1Options = _.merge htmlWidth: @options.depWidth, htmlWrapperAdditionalClass: 'dep-wrapper', htmlStrokeDasharray: @options.depDasharray, @options
    c2Options = _.merge htmlWidth: @options.depMainWidth, htmlWrapperAdditionalClass: 'dep-wrapper', @options
    @c1 = new StackHtmlElement @content1, c1Options
    @c2 = new StackHtmlElement @content2, c2Options

  getDefaultOptions: -> _.merge super(), depMargin: 30, depDasharray: '10 5'

  renderTo: (_parentEl) ->
    super _parentEl
    @g = @_el.group()
    @c1.renderTo @g
    @c2.renderTo @g
    @_arrangeDep false
    @c1.onHeightChanged =>
      @_arrangeDep true
    @c2.onHeightChanged =>
      @_arrangeDep true

    @c1.dep = @c2.dep = @ # debug
    # TODO think how to bind to dom rightly

  _arrangeDep: (animate) ->
    diff = (@c1.getHeight() - @c2.getHeight()) / 2
    @c1.moveTo 0, null, animate
    @c2.moveTo @options.depWidth + @options.depMargin, null, animate
    if @options.depIgnoreDepHeight or @c1.getHeight() > @c2.getHeight()
      @c1.moveTo null, 0, animate
      @c2.moveTo null, diff, animate
    else
      @c1.moveTo null, -diff, animate
      @c2.moveTo null, 0, animate
    @_drawArrow()
    @_fireHeightChanged()

  getHeight: -> if @options.depIgnoreDepHeight then @c1.getHeight() else Math.max(@c1.getHeight(), @c2.getHeight())

  _drawArrow: ->
    h2 = @getHeight() / 2
    points = [[@options.depWidth, h2], [@options.depWidth + @options.depMargin, h2]]
    if not @_arrow
      @_arrow = @g.polyline(points).addClass(@options.depLineClass)
    else
      @_animate(@_arrow, true).plot(points)
