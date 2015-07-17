$ ->
  data =
  {
    c: '<span>ALPHABETAGAMMA</span>'
    d: [
      {
        c: '1', d: [
          {
            c: '12'
            d: [
              { c: '<div>121</div><div><a href="#">here</a></div><div><span>pp</span></div>' }
              { c: '122', d: [
                { c: '1221' }
                { c: '1222' }
                { c: '1223' }
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

  window.s = SVG(document.getElementById('svg'))
  # window.g = new G
  # g.addChild new R 200, 50
  # g.addChild new R 160, 70
  # g.addChild new HR '<h3>Hi</h3>'
  # g.addChild new R 160, 70
  # g.renderTo s

  window.t = new StackTreeContainer data
  t.renderTo s
  
  # window.h1 = new StackHtmlElement 'a'
  # h2 = new StackHtmlElement 'b'
  # g = new StackContainer
  # g.addChild h1
  # g.addChild h2
  # g.renderTo s

  $('.content-wrapper').on 'click', (event) ->
    tree = $(event.currentTarget).data('stack-element').tree
    tree.toggleCollapse()
    # tree._arrangeChildren()
  
  $('div').mousedown ->
    setTimeout ->
      window.getSelection().removeAllRanges()
    , 0
