SVGTree.StructureTreeFactory =
  renderTree: (container, data, dataAccessors, options) ->
    svg = SVG(container)
    stackRoot = new SVGTree.StackRoot
    tree = new SVGTree.StructureTree data, dataAccessors, SVGTree.StackTreeHeaderProvider, options
    stackRoot.addChild tree
    stackRoot.renderTo svg
    tree
