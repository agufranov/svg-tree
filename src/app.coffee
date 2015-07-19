$ ->
  data =
  {
    c: '<span>ALPHABETAGAMMA</span>'
    add: '<span class="root-header-addition">There are no service dependencies</span>'
    parent: '<h4>Parent</h4>'
    d: [
      {
        c: '1', d: [
          {
            c: '12'
            d: [
              { c: '<div>121</div><div><a href="#">here</a></div><div><span>pp</span></div>' }
              { c: '122', d: [
                { c: '1221', d: [
                  { c: '1' }
                  { c: '2' }
                  { cc: '3' }
                ]}
                { c: '1222' }
                { c: '1223' }
                { cc: 'd1' }
                { cc: 'd2' }
                { c: '1224' }
                { cc: 'd3' }
                { c: '1225' }
              ]}
              { c: '123', d: [ { c: '1231' }, { c: '1232' } ] }
            ]
          }
        ]
      }
      {
        c: '2', d: [
          { c: '22' }
        ]
      }
    ]
  }

  # data = {
  #   c: 'a'
  #   d: [
  #     { cc: '<div style="height:80px">A</div>', ccc: '<div style="height:180px">A</div>' }
  #     { c: 3 }
  #     { cc: '2' }
  #   ]
  # }

  # data = {
  #   c: 'a'
  #   d: [
  #     { cc: '1' }
  #     { cc: '2' }
  #     { c: 'b' }
  #     { cc: '3' }
  #     { c: 'c' }
  #   ]
  # }

  window.s = SVG(document.getElementById('svg'))
  # window.g = new G
  # g.addChild new R 200, 50
  # g.addChild new R 160, 70
  # g.addChild new HR '<h3>Hi</h3>'
  # g.addChild new R 160, 70
  # g.renderTo s

  window.t = new StructureTree data, {
    isDep: (data) -> !!data.cc
    getDepContent: (data) -> data.ccc or '<h3>[dep]</h3>' + data.cc
    getContent: (data) -> data.c or data.cc
    getChildrenArray: (data) -> data.d
    getRootHeaderAdditionalContent: (data) -> data.add
    getParentContent: (data) -> data.parent
  }, StackTreeHeaderProvider, {
    animationDuration: 50
    treeDepDasharray: '10 2'
    treeRootLineToEnd: true
  }
  t.renderTo s

  # window.dep = t._treeComponent._childTrees[0]._headerComponent
  # window.randh = -> "<div style='height: #{Math.round(Math.random() * 5) * 50}px'>A</div>"
  # window.f = -> dep.c1.updateContent randh()
  # window.g = -> dep.c2.updateContent randh()
  
  # $(document).on 'click', '.dep-wrapper', (event) ->
  #   dep = $(event.currentTarget).data('stack-element').dep
  #   dep._leftComponent.updateContent randh()
  #   dep._rightComponent.updateContent randh()
  
  # Prevent selection on double click
  $('div').mousedown ->
    setTimeout ->
      window.getSelection().removeAllRanges()
    , 0
