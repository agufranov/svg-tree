var SvgStackTree,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SvgStackTree = (function(superClass) {
  extend(SvgStackTree, superClass);

  function SvgStackTree(data, depth, options) {
    var childData;
    this.data = data;
    this.depth = depth != null ? depth : 0;
    SvgStackTree.__super__.constructor.call(this, options);
    this.options.groupChildMargin = this.options.treeNestedMargin;
    this._headerComponent = this.addChild(new HtmlStackElement(this.data.c, {
      htmlWidth: this.options.treeWidth - this.options.treeDepthShift * this.depth
    }));
    if (this.data.d) {
      this._childrenComponent = this.addChild(new SvgStackNode({
        groupChildMargin: this.options.treeFlatMargin
      }));
      this.childTrees = (function() {
        var i, len, ref, results;
        ref = this.data.d;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          childData = ref[i];
          results.push(this._childrenComponent.addChild(new SvgStackTree(childData, this.depth + 1, options)));
        }
        return results;
      }).call(this);
    }
  }

  SvgStackTree.prototype.getDefaultOptions = function() {
    return _.merge(SvgStackTree.__super__.getDefaultOptions.call(this), {
      treeFlatMargin: 20,
      treeNestedMargin: 5,
      treeDepthShift: 30,
      treeWidth: 300,
      treeParentLineMargin: 10,
      treeLineClass: 'tree-line'
    });
  };

  SvgStackTree.prototype.renderTo = function(_parentEl) {
    SvgStackTree.__super__.renderTo.call(this, _parentEl);
    if (this._childrenComponent) {
      this._childrenComponent.moveBy(this.options.treeDepthShift, 0);
      this._drawParentLine();
    }
    if (this.depth > 0) {
      return this._drawChildLine();
    }
  };

  SvgStackTree.prototype._drawParentLine = function() {
    var childTree, d, h, i, len, ref;
    h = 0;
    if (this.childTrees.length > 1) {
      ref = this.childTrees.slice(0, +(this.childTrees.length - 2) + 1 || 9e9);
      for (i = 0, len = ref.length; i < len; i++) {
        childTree = ref[i];
        h += childTree.getHeight() + this.options.treeFlatMargin;
      }
    }
    h += this.childTrees[this.childTrees.length - 1]._headerComponent.getHeight() / 2;
    d = this.options.treeDepthShift - this.options.treeParentLineMargin;
    return this._childrenComponent._el.line(-d, -this.options.treeNestedMargin, -d, h).addClass(this.options.treeLineClass);
  };

  SvgStackTree.prototype._drawChildLine = function() {
    var d, h;
    h = this._headerComponent.getHeight() / 2;
    d = this.options.treeDepthShift - this.options.treeParentLineMargin;
    return this._headerComponent._el.line(0, h, -d, h).addClass(this.options.treeLineClass);
  };

  return SvgStackTree;

})(SvgStackContainer);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvc3ZnU3RhY2tUcmVlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFlBQUE7RUFBQTs7O0FBQU07OztFQUNTLHNCQUFDLElBQUQsRUFBUSxLQUFSLEVBQW9CLE9BQXBCO0FBQ1gsUUFBQTtJQURZLElBQUMsQ0FBQSxPQUFEO0lBQU8sSUFBQyxDQUFBLHdCQUFELFFBQVM7SUFDNUIsOENBQU0sT0FBTjtJQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsZ0JBQVQsR0FBNEIsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNyQyxJQUFDLENBQUEsZ0JBQUQsR0FBb0IsSUFBQyxDQUFBLFFBQUQsQ0FBYyxJQUFBLGdCQUFBLENBQWlCLElBQUMsQ0FBQSxJQUFJLENBQUMsQ0FBdkIsRUFBMEI7TUFBQSxTQUFBLEVBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEdBQXFCLElBQUMsQ0FBQSxPQUFPLENBQUMsY0FBVCxHQUEwQixJQUFDLENBQUEsS0FBM0Q7S0FBMUIsQ0FBZDtJQUNwQixJQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsQ0FBVDtNQUNFLElBQUMsQ0FBQSxrQkFBRCxHQUFzQixJQUFDLENBQUEsUUFBRCxDQUFjLElBQUEsWUFBQSxDQUFhO1FBQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxjQUEzQjtPQUFiLENBQWQ7TUFDdEIsSUFBQyxDQUFBLFVBQUQ7O0FBQWU7QUFBQTthQUFBLHFDQUFBOzt1QkFBQSxJQUFDLENBQUEsa0JBQWtCLENBQUMsUUFBcEIsQ0FBaUMsSUFBQSxZQUFBLENBQWEsU0FBYixFQUF3QixJQUFDLENBQUEsS0FBRCxHQUFTLENBQWpDLEVBQW9DLE9BQXBDLENBQWpDO0FBQUE7O29CQUZqQjs7RUFKVzs7eUJBUWIsaUJBQUEsR0FBbUIsU0FBQTtXQUFHLENBQUMsQ0FBQyxLQUFGLENBQVEsa0RBQUEsQ0FBUixFQUFpQjtNQUFBLGNBQUEsRUFBZ0IsRUFBaEI7TUFBb0IsZ0JBQUEsRUFBa0IsQ0FBdEM7TUFBeUMsY0FBQSxFQUFnQixFQUF6RDtNQUE2RCxTQUFBLEVBQVcsR0FBeEU7TUFBNkUsb0JBQUEsRUFBc0IsRUFBbkc7TUFBdUcsYUFBQSxFQUFlLFdBQXRIO0tBQWpCO0VBQUg7O3lCQUVuQixRQUFBLEdBQVUsU0FBQyxTQUFEO0lBQ1IsMkNBQU0sU0FBTjtJQUVBLElBQUcsSUFBQyxDQUFBLGtCQUFKO01BQ0UsSUFBQyxDQUFBLGtCQUFrQixDQUFDLE1BQXBCLENBQTJCLElBQUMsQ0FBQSxPQUFPLENBQUMsY0FBcEMsRUFBb0QsQ0FBcEQ7TUFFQSxJQUFDLENBQUEsZUFBRCxDQUFBLEVBSEY7O0lBTUEsSUFBRyxJQUFDLENBQUEsS0FBRCxHQUFTLENBQVo7YUFDRSxJQUFDLENBQUEsY0FBRCxDQUFBLEVBREY7O0VBVFE7O3lCQVlWLGVBQUEsR0FBaUIsU0FBQTtBQUVmLFFBQUE7SUFBQSxDQUFBLEdBQUk7SUFDSixJQUFHLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixHQUFxQixDQUF4QjtBQUNFO0FBQUEsV0FBQSxxQ0FBQTs7UUFDRSxDQUFBLElBQUssU0FBUyxDQUFDLFNBQVYsQ0FBQSxDQUFBLEdBQXdCLElBQUMsQ0FBQSxPQUFPLENBQUM7QUFEeEMsT0FERjs7SUFHQSxDQUFBLElBQUssSUFBQyxDQUFBLFVBQVcsQ0FBQSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUIsQ0FBckIsQ0FBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFyRCxDQUFBLENBQUEsR0FBbUU7SUFFeEUsQ0FBQSxHQUFJLElBQUMsQ0FBQSxPQUFPLENBQUMsY0FBVCxHQUEwQixJQUFDLENBQUEsT0FBTyxDQUFDO1dBRXZDLElBQUMsQ0FBQSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBeEIsQ0FBNkIsQ0FBQyxDQUE5QixFQUFpQyxDQUFDLElBQUMsQ0FBQSxPQUFPLENBQUMsZ0JBQTNDLEVBQTZELENBQUMsQ0FBOUQsRUFBaUUsQ0FBakUsQ0FBbUUsQ0FBQyxRQUFwRSxDQUE2RSxJQUFDLENBQUEsT0FBTyxDQUFDLGFBQXRGO0VBVmU7O3lCQVlqQixjQUFBLEdBQWdCLFNBQUE7QUFDZCxRQUFBO0lBQUEsQ0FBQSxHQUFJLElBQUMsQ0FBQSxnQkFBZ0IsQ0FBQyxTQUFsQixDQUFBLENBQUEsR0FBZ0M7SUFDcEMsQ0FBQSxHQUFJLElBQUMsQ0FBQSxPQUFPLENBQUMsY0FBVCxHQUEwQixJQUFDLENBQUEsT0FBTyxDQUFDO1dBQ3ZDLElBQUMsQ0FBQSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBdEIsQ0FBMkIsQ0FBM0IsRUFBOEIsQ0FBOUIsRUFBaUMsQ0FBQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUF1QyxDQUFDLFFBQXhDLENBQWlELElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBMUQ7RUFIYzs7OztHQW5DUyIsImZpbGUiOiJjbGFzc2VzL3N2Z1N0YWNrVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFN2Z1N0YWNrVHJlZSBleHRlbmRzIFN2Z1N0YWNrQ29udGFpbmVyXG4gIGNvbnN0cnVjdG9yOiAoQGRhdGEsIEBkZXB0aCA9IDAsIG9wdGlvbnMpIC0+XG4gICAgc3VwZXIgb3B0aW9uc1xuICAgIEBvcHRpb25zLmdyb3VwQ2hpbGRNYXJnaW4gPSBAb3B0aW9ucy50cmVlTmVzdGVkTWFyZ2luXG4gICAgQF9oZWFkZXJDb21wb25lbnQgPSBAYWRkQ2hpbGQgbmV3IEh0bWxTdGFja0VsZW1lbnQgQGRhdGEuYywgaHRtbFdpZHRoOiBAb3B0aW9ucy50cmVlV2lkdGggLSBAb3B0aW9ucy50cmVlRGVwdGhTaGlmdCAqIEBkZXB0aFxuICAgIGlmIEBkYXRhLmRcbiAgICAgIEBfY2hpbGRyZW5Db21wb25lbnQgPSBAYWRkQ2hpbGQgbmV3IFN2Z1N0YWNrTm9kZSBncm91cENoaWxkTWFyZ2luOiBAb3B0aW9ucy50cmVlRmxhdE1hcmdpblxuICAgICAgQGNoaWxkVHJlZXMgPSAoQF9jaGlsZHJlbkNvbXBvbmVudC5hZGRDaGlsZChuZXcgU3ZnU3RhY2tUcmVlKGNoaWxkRGF0YSwgQGRlcHRoICsgMSwgb3B0aW9ucykpIGZvciBjaGlsZERhdGEgaW4gQGRhdGEuZClcblxuICBnZXREZWZhdWx0T3B0aW9uczogLT4gXy5tZXJnZSBzdXBlcigpLCB0cmVlRmxhdE1hcmdpbjogMjAsIHRyZWVOZXN0ZWRNYXJnaW46IDUsIHRyZWVEZXB0aFNoaWZ0OiAzMCwgdHJlZVdpZHRoOiAzMDAsIHRyZWVQYXJlbnRMaW5lTWFyZ2luOiAxMCwgdHJlZUxpbmVDbGFzczogJ3RyZWUtbGluZSdcblxuICByZW5kZXJUbzogKF9wYXJlbnRFbCkgLT5cbiAgICBzdXBlciBfcGFyZW50RWxcbiAgICAjIFNoaWZ0IHN1YnRyZWVcbiAgICBpZiBAX2NoaWxkcmVuQ29tcG9uZW50XG4gICAgICBAX2NoaWxkcmVuQ29tcG9uZW50Lm1vdmVCeSBAb3B0aW9ucy50cmVlRGVwdGhTaGlmdCwgMFxuICAgICAgIyBEcmF3IHBhcmVudCBsaW5lIGlmIGhhcyBjaGlsZHJlblxuICAgICAgQF9kcmF3UGFyZW50TGluZSgpXG5cbiAgICAjIERyYXcgY2hpbGQgbGluZSBpZiBpcyBjaGlsZHJlblxuICAgIGlmIEBkZXB0aCA+IDBcbiAgICAgIEBfZHJhd0NoaWxkTGluZSgpXG4gICAgXG4gIF9kcmF3UGFyZW50TGluZTogLT5cbiAgICAjIENhbGN1bGF0ZSBwYXJlbnQgbGluZSBoZWlnaHRcbiAgICBoID0gMFxuICAgIGlmIEBjaGlsZFRyZWVzLmxlbmd0aCA+IDFcbiAgICAgIGZvciBjaGlsZFRyZWUgaW4gQGNoaWxkVHJlZXNbMC4uQGNoaWxkVHJlZXMubGVuZ3RoIC0gMl1cbiAgICAgICAgaCArPSBjaGlsZFRyZWUuZ2V0SGVpZ2h0KCkgKyBAb3B0aW9ucy50cmVlRmxhdE1hcmdpblxuICAgIGggKz0gQGNoaWxkVHJlZXNbQGNoaWxkVHJlZXMubGVuZ3RoIC0gMV0uX2hlYWRlckNvbXBvbmVudC5nZXRIZWlnaHQoKSAvIDJcblxuICAgIGQgPSBAb3B0aW9ucy50cmVlRGVwdGhTaGlmdCAtIEBvcHRpb25zLnRyZWVQYXJlbnRMaW5lTWFyZ2luXG5cbiAgICBAX2NoaWxkcmVuQ29tcG9uZW50Ll9lbC5saW5lKC1kLCAtQG9wdGlvbnMudHJlZU5lc3RlZE1hcmdpbiwgLWQsIGgpLmFkZENsYXNzKEBvcHRpb25zLnRyZWVMaW5lQ2xhc3MpXG5cbiAgX2RyYXdDaGlsZExpbmU6IC0+XG4gICAgaCA9IEBfaGVhZGVyQ29tcG9uZW50LmdldEhlaWdodCgpIC8gMlxuICAgIGQgPSBAb3B0aW9ucy50cmVlRGVwdGhTaGlmdCAtIEBvcHRpb25zLnRyZWVQYXJlbnRMaW5lTWFyZ2luXG4gICAgQF9oZWFkZXJDb21wb25lbnQuX2VsLmxpbmUoMCwgaCwgLWQsIGgpLmFkZENsYXNzKEBvcHRpb25zLnRyZWVMaW5lQ2xhc3MpXG5cbiJdfQ==