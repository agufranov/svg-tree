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
    # @_el.path "M#{pos} 0 h-#{rw} v-#{rh} h-#{cw} l#{hw},-#{hw} l#{hw},#{hw} h-#{cw} v#{rh} Z"
    l = @_el.polyline [
      [pos, 0]
      [pos-rw, 0]
      [pos-rw, -rh]
      [pos-rw-cw, -rh]
      [pos-rw-cw+hw, -rh-hw]
      [pos-rw-cw+hw+hw, -rh]
      [pos-rw-cw+hw+hw-cw, -rh]
      [pos-rw-cw+hw+hw-cw, 0]
    ]
      .stroke @options.arrowStroke
      .fill @options.arrowFill
      .move pos - cw - rw, 0
    l

  getHeight: -> @height
