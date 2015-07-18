class StackHtmlDepElement extends StackElement
  # TODO Refactor and arrow
  constructor: (@content1, @content2, options) ->
    super options
    @c1 = new StackHtmlElement @content1, htmlWidth: @options.depWidth, htmlStrokeDasharray: @options.depDasharray
    @c2 = new StackHtmlElement @content2, htmlWidth: @options.depWidth

  getDefaultOptions: -> _.merge super(), depMargin: 30, depDasharray: '10 5'

  renderTo: (_parentEl) ->
    super _parentEl
    @g = @_el.group()
    @c1.renderTo @g
    @c2.renderTo @g
    @g.move 0, (@getHeight() - @c1.getHeight()) / 2
    @c2.moveTo @options.depWidth + @options.depMargin, (@c1.getHeight() - @c2.getHeight()) / 2
    @_drawArrow()

  getHeight: -> if @options.depIgnoreDepHeight then @c1.getHeight() else Math.max(@c1.getHeight(), @c2.getHeight())

  _drawArrow: ->
    @g.line(@options.depWidth, @c1.getHeight() / 2, @options.depWidth + @options.depMargin, @c1.getHeight() / 2).addClass('tree-line')
