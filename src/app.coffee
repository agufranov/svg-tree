$ ->
  window.s = SVG(document.getElementById('svg'))

  dataAccessors = {
    isDep: (data) -> !!data.cc
    getDepContent: (data) -> data.ccc or '<h3>[dep]</h3>' + data.cc
    getContent: (data) -> data.c or data.cc
    getChildrenArray: (data) -> data.d
    getParentContent: (data) -> data.parent
    getUnbindedArray: (data) -> data.unbinded
  }

  dataAccessors.hasDeps = (data) ->
    _.any dataAccessors.getChildrenArray(data), (childData) -> dataAccessors.isDep(childData)

  window.tree = StructureTreeFactory.renderTree document.getElementById('svg'), treeData, dataAccessors, {
    animationDuration: 50
    treeDepDasharray: '10 2'
    treeFlatMargin: 20
    treeNestedMargin: 10
    treeRootNestedMargin: 20
  }

  window.randh = -> "<div style='height: #{Math.round(Math.random() * 5) * 50}px'>A</div>"
  
  $(document).on 'click', '.dep-wrapper', (event) ->
    dep = $(event.currentTarget).data('stack-element').dep
    dep._leftComponent.updateContent randh()
    dep._rightComponent.updateContent randh()
  
  # Prevent selection on double click
  $('div').mousedown ->
    setTimeout ->
      window.getSelection().removeAllRanges()
    , 0
