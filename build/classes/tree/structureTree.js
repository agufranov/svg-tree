var StructureTree,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StructureTree = (function(superClass) {
  extend(StructureTree, superClass);

  function StructureTree(data, dataAccessors, _headerProviderClass, options) {
    var parentContent;
    StructureTree.__super__.constructor.call(this, options);
    this._treeComponent = new StackTreeContainer(data, dataAccessors, _headerProviderClass, options);
    if ((parentContent = this._treeComponent.dataAccessors.getParentContent(this._treeComponent.data))) {
      this._treeParentComponent = new StackHtmlElement(parentContent, {
        animationDuration: this._treeComponent.options.animationDuration,
        htmlWidth: this._treeComponent.options.treeWidth
      });
      this._treeParentArrow = new StructureTreeArrow({
        arrowMainWidth: this._treeComponent.options.treeWidth * 2,
        arrowPosition: this._treeComponent.options.treeWidth / 2,
        arrowRootWidth: 5,
        arrowRootHeight: 20,
        arrowCapWidth: 10,
        arrowPadding: 10,
        arrowLineStroke: 'gray',
        arrowStroke: 'none',
        arrowFill: '#CCC',
        arrowLineDasharray: '10 3'
      });
      this.addChild(this._treeParentComponent);
      this.addChild(this._treeParentArrow);
    }
    this.addChild(this._treeComponent);
  }

  return StructureTree;

})(StackContainer);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvdHJlZS9zdHJ1Y3R1cmVUcmVlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGFBQUE7RUFBQTs7O0FBQU07OztFQUNTLHVCQUFDLElBQUQsRUFBTyxhQUFQLEVBQXNCLG9CQUF0QixFQUE0QyxPQUE1QztBQUNYLFFBQUE7SUFBQSwrQ0FBTSxPQUFOO0lBQ0EsSUFBQyxDQUFBLGNBQUQsR0FBc0IsSUFBQSxrQkFBQSxDQUFtQixJQUFuQixFQUF5QixhQUF6QixFQUF3QyxvQkFBeEMsRUFBOEQsT0FBOUQ7SUFDdEIsSUFBRSxDQUFDLGFBQUEsR0FBZ0IsSUFBQyxDQUFBLGNBQWMsQ0FBQyxhQUFhLENBQUMsZ0JBQTlCLENBQStDLElBQUMsQ0FBQSxjQUFjLENBQUMsSUFBL0QsQ0FBakIsQ0FBRjtNQUNFLElBQUMsQ0FBQSxvQkFBRCxHQUE0QixJQUFBLGdCQUFBLENBQWlCLGFBQWpCLEVBQzFCO1FBQUEsaUJBQUEsRUFBbUIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxPQUFPLENBQUMsaUJBQTNDO1FBQ0EsU0FBQSxFQUFXLElBQUMsQ0FBQSxjQUFjLENBQUMsT0FBTyxDQUFDLFNBRG5DO09BRDBCO01BRzVCLElBQUMsQ0FBQSxnQkFBRCxHQUF3QixJQUFBLGtCQUFBLENBQ3RCO1FBQUEsY0FBQSxFQUFnQixJQUFDLENBQUEsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUF4QixHQUFvQyxDQUFwRDtRQUNBLGFBQUEsRUFBZSxJQUFDLENBQUEsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUF4QixHQUFvQyxDQURuRDtRQUVBLGNBQUEsRUFBZ0IsQ0FGaEI7UUFHQSxlQUFBLEVBQWlCLEVBSGpCO1FBSUEsYUFBQSxFQUFlLEVBSmY7UUFLQSxZQUFBLEVBQWMsRUFMZDtRQU1BLGVBQUEsRUFBaUIsTUFOakI7UUFPQSxXQUFBLEVBQWEsTUFQYjtRQVFBLFNBQUEsRUFBVyxNQVJYO1FBU0Esa0JBQUEsRUFBb0IsTUFUcEI7T0FEc0I7TUFXeEIsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsb0JBQVg7TUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxnQkFBWCxFQWhCRjs7SUFpQkEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsY0FBWDtFQXBCVzs7OztHQURhIiwiZmlsZSI6ImNsYXNzZXMvdHJlZS9zdHJ1Y3R1cmVUcmVlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3RydWN0dXJlVHJlZSBleHRlbmRzIFN0YWNrQ29udGFpbmVyXG4gIGNvbnN0cnVjdG9yOiAoZGF0YSwgZGF0YUFjY2Vzc29ycywgX2hlYWRlclByb3ZpZGVyQ2xhc3MsIG9wdGlvbnMpIC0+XG4gICAgc3VwZXIgb3B0aW9uc1xuICAgIEBfdHJlZUNvbXBvbmVudCA9IG5ldyBTdGFja1RyZWVDb250YWluZXIgZGF0YSwgZGF0YUFjY2Vzc29ycywgX2hlYWRlclByb3ZpZGVyQ2xhc3MsIG9wdGlvbnNcbiAgICBpZihwYXJlbnRDb250ZW50ID0gQF90cmVlQ29tcG9uZW50LmRhdGFBY2Nlc3NvcnMuZ2V0UGFyZW50Q29udGVudChAX3RyZWVDb21wb25lbnQuZGF0YSkpXG4gICAgICBAX3RyZWVQYXJlbnRDb21wb25lbnQgPSBuZXcgU3RhY2tIdG1sRWxlbWVudCBwYXJlbnRDb250ZW50LFxuICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogQF90cmVlQ29tcG9uZW50Lm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb25cbiAgICAgICAgaHRtbFdpZHRoOiBAX3RyZWVDb21wb25lbnQub3B0aW9ucy50cmVlV2lkdGhcbiAgICAgIEBfdHJlZVBhcmVudEFycm93ID0gbmV3IFN0cnVjdHVyZVRyZWVBcnJvd1xuICAgICAgICBhcnJvd01haW5XaWR0aDogQF90cmVlQ29tcG9uZW50Lm9wdGlvbnMudHJlZVdpZHRoICogMlxuICAgICAgICBhcnJvd1Bvc2l0aW9uOiBAX3RyZWVDb21wb25lbnQub3B0aW9ucy50cmVlV2lkdGggLyAyXG4gICAgICAgIGFycm93Um9vdFdpZHRoOiA1XG4gICAgICAgIGFycm93Um9vdEhlaWdodDogMjBcbiAgICAgICAgYXJyb3dDYXBXaWR0aDogMTBcbiAgICAgICAgYXJyb3dQYWRkaW5nOiAxMFxuICAgICAgICBhcnJvd0xpbmVTdHJva2U6ICdncmF5J1xuICAgICAgICBhcnJvd1N0cm9rZTogJ25vbmUnXG4gICAgICAgIGFycm93RmlsbDogJyNDQ0MnXG4gICAgICAgIGFycm93TGluZURhc2hhcnJheTogJzEwIDMnXG4gICAgICBAYWRkQ2hpbGQgQF90cmVlUGFyZW50Q29tcG9uZW50XG4gICAgICBAYWRkQ2hpbGQgQF90cmVlUGFyZW50QXJyb3dcbiAgICBAYWRkQ2hpbGQgQF90cmVlQ29tcG9uZW50XG4gICAgIyBUT0RPIE1heWJlIHJlZmFjdG9yIG9wdGlvbnMgZnJvbSB7IGVsMVg6IC4uLiwgZWwyeS4uLiB9IHRvIHsgZWwxOiB7IHg6IC4uLiB9LCBlbDI6IHsgeTogLi4uIH0gfSA/XG4iXX0=