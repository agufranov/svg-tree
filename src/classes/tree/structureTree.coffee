class StructureTree extends StackContainer
  constructor: (data, dataAccessors, _headerProviderClass, options) ->
    super options
    @_treeComponent = new StackTreeContainer data, dataAccessors, _headerProviderClass, options
    if(parentContent = @_treeComponent.dataAccessors.getParentContent(@_treeComponent.data))
      @_treeParentComponent = new StackHtmlElement parentContent,
        animationDuration: @_treeComponent.options.animationDuration
        htmlWidth: @_treeComponent.options.treeWidth
      @_treeParentArrow = new StructureTreeArrow
        arrowMainWidth: @_treeComponent.options.treeWidth * 2
        arrowPosition: @_treeComponent.options.treeWidth / 2
        arrowRootWidth: 5
        arrowRootHeight: 20
        arrowCapWidth: 10
        arrowPadding: 10
        arrowLineStroke: 'gray'
        arrowStroke: 'none'
        arrowFill: '#CCC'
        arrowLineDasharray: '10 3'
      @addChild @_treeParentComponent
      @addChild @_treeParentArrow
    @addChild @_treeComponent
    # TODO Maybe refactor options from { el1X: ..., el2y... } to { el1: { x: ... }, el2: { y: ... } } ?
