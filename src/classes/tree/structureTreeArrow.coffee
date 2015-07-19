class StructureTreeArrow extends StackElement
  renderTo: (_parentEl) ->
    super _parentEl
    [mw, pos, rw, rh, cw, pad] = _.values _.pick @options, 'arrowMainWidth', 'arrowPosition', 'arrowRootWidth', 'arrowRootHeight', 'arrowCapWidth', 'arrowPadding'
    hw = rw + cw
    h = hw + rh
    @height = h
    console.log "Arrow position: #{pos}"
    lineLeft = @_el.line 0, h / 2, pos - rw - cw - pad, h / 2
    lineRight = @_el.line pos + rw + cw + pad, h / 2, mw, h / 2
    for line in [lineLeft, lineRight]
      line
        .stroke @options.arrowLineStroke
        .style 'stroke-dasharray', @options.arrowLineDasharray
    @_el.path "M#{pos} 0 h-#{rw} v-#{rh} h-#{cw} l#{hw},-#{hw} l#{hw},#{hw} h-#{cw} v#{rh} Z"
      .stroke @options.arrowStroke
      .fill @options.arrowFill
      .dy h

  getHeight: -> @height
