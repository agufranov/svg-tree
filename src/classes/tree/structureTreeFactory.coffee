StructureTreeFactory =
  renderTree: (container, data, dataAccessors, options) ->
    svg = SVG(container)
    stackRoot = new StackRoot
    tree = new StructureTree data, dataAccessors, StackTreeHeaderProvider, options
    stackRoot.addChild tree
    stackRoot.renderTo svg
