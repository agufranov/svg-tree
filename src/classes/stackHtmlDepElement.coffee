class StackHtmlDepElement extends StackVerticalContainer
  # TODO Arrow
  constructor: (@leftContent, @rightContent, options) ->
    super options
    leftOptions = _.merge htmlWidth: @options.depWidth, htmlWrapperAdditionalClass: 'dep-wrapper', htmlStrokeDasharray: @options.depDasharray, @options
    rightOptions = _.merge htmlWidth: @options.depMainWidth, htmlWrapperAdditionalClass: 'dep-wrapper', ignoreHeight: @options.depIgnoreDepHeight, @options
    @_leftComponent = new StackHtmlElement @leftContent, leftOptions
    @_rightComponent = new StackHtmlElement @rightContent, rightOptions
    @addChild @_leftComponent
    @addChild @_rightComponent

    @_leftComponent.dep = @_rightComponent.dep = @ # debug

  getDefaultOptions: -> _.merge super(), vertMargin: @options.depWidth + 30, depDasharray: '10 5'

  _arrange: (animate) ->
    super animate
    @_drawArrow()

  _drawArrow: ->
    h2 = @getHeight() / 2
    points = [[@options.depWidth, h2], [@options.vertMargin, h2]]
    if not @_arrow
      @_arrow = @_el.polyline(points).addClass(@options.depLineClass)
    else
      @_animate(@_arrow, true).plot(points)
