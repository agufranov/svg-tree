var StackTreeContainer, StackTreeHeaderProvider,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StackTreeContainer = (function(superClass) {
  extend(StackTreeContainer, superClass);

  function StackTreeContainer(data, dataAccessors, _headerProviderClass, options, depth) {
    var childData, childOpts, childTree, childrenData, i, j, ref;
    this.data = data;
    this.dataAccessors = dataAccessors;
    this._headerProviderClass = _headerProviderClass;
    this.depth = depth != null ? depth : 0;
    StackTreeContainer.__super__.constructor.call(this, options);
    this._headerProvider = new this._headerProviderClass(this);
    this.options.groupChildMargin = this.options.treeNestedMargin;
    this._headerComponent = this._headerProvider.createHeader();
    this._headerComponent.tree = this;
    this.addChild(this._headerComponent);
    childrenData = this.dataAccessors.getChildrenArray(this.data);
    if (childrenData) {
      this._treeChildrenComponent = this.addChild(new StackContainer({
        groupChildMargin: this.options.treeFlatMargin,
        animationDuration: this.options.animationDuration
      }));
      this._childTrees = [];
      for (i = j = 0, ref = childrenData.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        childData = childrenData[i];
        childOpts = this.options;
        if (this.dataAccessors.isDep(childData) && ((i < childrenData.length - 1 && this.dataAccessors.isDep(childrenData[i + 1])) || (i > 0 && this.dataAccessors.isDep(childrenData[i - 1])))) {
          childOpts = _.merge({
            treeDepHasSurroundingDeps: true
          }, this.options);
        }
        childTree = new StackTreeContainer(childData, this.dataAccessors, this._headerProviderClass, childOpts, this.depth + 1);
        this._treeChildrenComponent.addChild(childTree);
        this._childTrees.push(childTree);
      }
    }
  }

  StackTreeContainer.prototype.getDefaultOptions = function() {
    return _.merge(StackTreeContainer.__super__.getDefaultOptions.call(this), {
      treeFlatMargin: 20,
      treeNestedMargin: 5,
      treeDepthShift: 30,
      treeWidth: 300,
      treeParentLineMargin: 10,
      treeLineClass: 'tree-line'
    });
  };

  StackTreeContainer.prototype.renderTo = function(_parentEl) {
    StackTreeContainer.__super__.renderTo.call(this, _parentEl);
    if (this._treeChildrenComponent) {
      return this._treeChildrenComponent.moveBy(this.options.treeDepthShift, 0);
    }
  };

  StackTreeContainer.prototype.toggleCollapse = function() {
    if (!this._treeChildrenComponent) {
      return;
    }
    return this._treeChildrenComponent.fadeToggle((function(_this) {
      return function() {
        return _this._arrange(true);
      };
    })(this));
  };

  StackTreeContainer.prototype._arrange = function(animate) {
    StackTreeContainer.__super__._arrange.call(this, animate);
    if (this.depth > 0) {
      this._drawChildLine(animate);
    }
    if (this._treeChildrenComponent) {
      return this._drawParentLine(animate);
    }
  };

  StackTreeContainer.prototype._drawChildLine = function(animate) {
    var d, h, points;
    h = this._headerComponent.getHeight() / 2;
    d = this.options.treeDepthShift - this.options.treeParentLineMargin;
    points = [[0, h], [-d, h]];
    if (!this._childLine) {
      return this._childLine = this._headerComponent._el.polyline(points).addClass(this.options.treeLineClass);
    } else {
      return this._animate(this._childLine, animate).plot(points);
    }
  };

  StackTreeContainer.prototype._drawParentLine = function(animate) {
    var childTree, d, h, j, len, points, ref;
    h = 0;
    if (this._childTrees.length > 1) {
      ref = this._childTrees.slice(0, +(this._childTrees.length - 2) + 1 || 9e9);
      for (j = 0, len = ref.length; j < len; j++) {
        childTree = ref[j];
        h += childTree.getHeight() + this.options.treeFlatMargin;
      }
    }
    if (this.options.treeRootLineToEnd && this.depth === 0) {
      h += this._childTrees[this._childTrees.length - 1].getHeight();
    } else {
      h += this._childTrees[this._childTrees.length - 1]._headerComponent.getHeight() / 2;
    }
    d = this.options.treeDepthShift - this.options.treeParentLineMargin;
    points = [[-d, -this.options.treeNestedMargin], [-d, h]];
    if (!this._parentLine) {
      return this._parentLine = this._treeChildrenComponent._el.polyline(points).addClass(this.options.treeLineClass);
    } else {
      return this._animate(this._parentLine, animate).plot(points);
    }
  };

  return StackTreeContainer;

})(StackContainer);

StackTreeHeaderProvider = (function() {
  function StackTreeHeaderProvider(tree) {
    this.tree = tree;
  }

  StackTreeHeaderProvider.prototype.createHeader = function() {
    var additionalContent, f, h, header, headerAddition;
    if (this.tree.dataAccessors.isDep(this.tree.data)) {
      return new StackHtmlDepElement(this.tree.dataAccessors.getContent(this.tree.data), this.tree.dataAccessors.getDepContent(this.tree.data), {
        animationDuration: this.tree.options.animationDuration,
        depMainWidth: this.tree.options.treeWidth,
        depWidth: this.tree.options.treeWidth - this.tree.options.treeDepthShift * this.tree.depth,
        depIgnoreDepHeight: !this.tree.options.treeDepHasSurroundingDeps,
        depDasharray: this.tree.options.treeDepDasharray,
        depLineClass: this.tree.options.treeLineClass
      });
    } else {
      header = new StackHtmlElement(this.tree.dataAccessors.getContent(this.tree.data), {
        animationDuration: this.tree.options.animationDuration,
        htmlWidth: this.tree.options.treeWidth - this.tree.options.treeDepthShift * this.tree.depth
      });
      if (this.tree.depth === 0 && (additionalContent = this.tree.dataAccessors.getRootHeaderAdditionalContent(this.tree.data))) {
        h = new StackVerticalContainer({
          animationDuration: this.tree.options.animationDuration,
          vertMargin: this.tree.options.treeWidth
        });
        headerAddition = new StackHtmlElement(additionalContent, {
          animationDuration: this.tree.options.animationDuration,
          htmlWidth: this.tree.options.treeWidth,
          htmlRect: false
        });
        f = function() {
          var randh;
          randh = function() {
            return "<div style='height: " + (Math.round(Math.random() * 5) * 50) + "px'>A</div>";
          };
          header.updateContent(randh());
          return headerAddition.updateContent(randh());
        };
        header.on('click', f);
        headerAddition.on('click', f);
        h.addChild(header);
        h.addChild(headerAddition);
        return h;
      } else {
        return header;
      }
    }
  };

  return StackTreeHeaderProvider;

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvc3RhY2tUcmVlQ29udGFpbmVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDJDQUFBO0VBQUE7OztBQUFNOzs7RUFNUyw0QkFBQyxJQUFELEVBQVEsYUFBUixFQUF3QixvQkFBeEIsRUFBK0MsT0FBL0MsRUFBd0QsS0FBeEQ7QUFDWCxRQUFBO0lBRFksSUFBQyxDQUFBLE9BQUQ7SUFBTyxJQUFDLENBQUEsZ0JBQUQ7SUFBZ0IsSUFBQyxDQUFBLHVCQUFEO0lBQWdDLElBQUMsQ0FBQSx3QkFBRCxRQUFTO0lBQzVFLG9EQUFNLE9BQU47SUFDQSxJQUFDLENBQUEsZUFBRCxHQUF1QixJQUFBLElBQUMsQ0FBQSxvQkFBRCxDQUFzQixJQUF0QjtJQUN2QixJQUFDLENBQUEsT0FBTyxDQUFDLGdCQUFULEdBQTRCLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFHckMsSUFBQyxDQUFBLGdCQUFELEdBQW9CLElBQUMsQ0FBQSxlQUFlLENBQUMsWUFBakIsQ0FBQTtJQUNwQixJQUFDLENBQUEsZ0JBQWdCLENBQUMsSUFBbEIsR0FBeUI7SUFFekIsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsZ0JBQVg7SUFHQSxZQUFBLEdBQWUsSUFBQyxDQUFBLGFBQWEsQ0FBQyxnQkFBZixDQUFnQyxJQUFDLENBQUEsSUFBakM7SUFDZixJQUFHLFlBQUg7TUFDRSxJQUFDLENBQUEsc0JBQUQsR0FBMEIsSUFBQyxDQUFBLFFBQUQsQ0FBYyxJQUFBLGNBQUEsQ0FBZTtRQUFBLGdCQUFBLEVBQWtCLElBQUMsQ0FBQSxPQUFPLENBQUMsY0FBM0I7UUFBMkMsaUJBQUEsRUFBbUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxpQkFBdkU7T0FBZixDQUFkO01BQzFCLElBQUMsQ0FBQSxXQUFELEdBQWU7QUFDZixXQUFTLDRGQUFUO1FBQ0UsU0FBQSxHQUFZLFlBQWEsQ0FBQSxDQUFBO1FBQ3pCLFNBQUEsR0FBWSxJQUFDLENBQUE7UUFHYixJQUFHLElB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QTBEO1VBQTdEO1VBQ1IsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsS0FBQSxDQUFBLENBQXJCO2lCQUNBLGNBQWMsQ0FBQyxhQUFmLENBQTZCLEtBQUEsQ0FBQSxDQUE3QjtRQUhFO1FBSUosTUFBTSxDQUFDLEVBQVAsQ0FBVSxPQUFWLEVBQW1CLENBQW5CO1FBQ0EsY0FBYyxDQUFDLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsQ0FBM0I7UUFDQSxDQUFDLENBQUMsUUFBRixDQUFXLE1BQVg7UUFDQSxDQUFDLENBQUMsUUFBRixDQUFXLGNBQVg7ZUFDQSxFQW5CRjtPQUFBLE1BQUE7ZUFxQkUsT0FyQkY7T0FaRjs7RUFEWSIsImZpbGUiOiJjbGFzc2VzL3N0YWNrVHJlZUNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFN0YWNrVHJlZUNvbnRhaW5lciBleHRlbmRzIFN0YWNrQ29udGFpbmVyXG4gICMgVE9ETyBNYXliZSBnZXQgb3V0IHRoZSBjb2RlIHdoaWNoIGlzIGJpbmRlZCB3aXRoIGRhdGEgaW1wbGVtZW50YXRpb24gZGV0YWlscyAoaS5lLiBkZXBzKVxuICAjIFRPRE8gMC1sZXZlbCBjaGlsZCBtYXJnaW4gc2hvdWxkIGJlIGdyZWF0ZXIgYXMgb24gcGhvdG9cbiAgIyBUT0RPIFBhcmVudCBTVkcgcmVzaXppbmdcbiAgIyBUT0RPIFtET05FXSBBbmltYXRlIChjaGFuZ2UgbGluZXMgdG8gcG9seWxpbmVzKVxuICAjIFRPRE8gW0RPTkVdIERlcCBlbGVtZW50IHJpZ2h0IGFycmFuZ2luZ1xuICBjb25zdHJ1Y3RvcjogKEBkYXRhLCBAZGF0YUFjY2Vzc29ycywgQF9oZWFkZXJQcm92aWRlckNsYXNzLCBvcHRpb25zLCBAZGVwdGggPSAwKSAtPlxuICAgIHN1cGVyIG9wdGlvbnNcbiAgICBAX2hlYWRlclByb3ZpZGVyID0gbmV3IEBfaGVhZGVyUHJvdmlkZXJDbGFzcyBAXG4gICAgQG9wdGlvbnMuZ3JvdXBDaGlsZE1hcmdpbiA9IEBvcHRpb25zLnRyZWVOZXN0ZWRNYXJnaW5cblxuICAgICMgQ3JlYXRlIGhlYWRlclxuICAgIEBfaGVhZGVyQ29tcG9uZW50ID0gQF9oZWFkZXJQcm92aWRlci5jcmVhdGVIZWFkZXIoKVxuICAgIEBfaGVhZGVyQ29tcG9uZW50LnRyZWUgPSBAICMgZGVidWdcbiAgICAjIFRPRE8gdGhpbmsgaG93IHRvIGJpbmQgdG8gZG9tIHJpZ2h0bHlcbiAgICBAYWRkQ2hpbGQgQF9oZWFkZXJDb21wb25lbnRcblxuICAgICMgQ3JlYXRlIGNoaWxkcmVuXG4gICAgY2hpbGRyZW5EYXRhID0gQGRhdGFBY2Nlc3NvcnMuZ2V0Q2hpbGRyZW5BcnJheSBAZGF0YVxuICAgIGlmIGNoaWxkcmVuRGF0YVxuICAgICAgQF90cmVlQ2hpbGRyZW5Db21wb25lbnQgPSBAYWRkQ2hpbGQgbmV3IFN0YWNrQ29udGFpbmVyIGdyb3VwQ2hpbGRNYXJnaW46IEBvcHRpb25zLnRyZWVGbGF0TWFyZ2luLCBhbmltYXRpb25EdXJhdGlvbjogQG9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb25cbiAgICAgIEBfY2hpbGRUcmVlcyA9IFtdXG4gICAgICBmb3IgaSBpbiBbMC4uLmNoaWxkcmVuRGF0YS5sZW5ndGhdXG4gICAgICAgIGNoaWxkRGF0YSA9IGNoaWxkcmVuRGF0YVtpXVxuICAgICAgICBjaGlsZE9wdHMgPSBAb3B0aW9uc1xuXG4gICAgICAgICMgSWYgdHJlZSBoYXMgcmlnaHQgc2lkZSAmIGhhcyBzdWNoIHN1cnJvdW5kaW5nIHRyZWVzLCB3ZSBuZWVkIHRvIGNvbnNpZGVyIGl0cyByaWdodCBzaWRlIGhlaWdodFxuICAgICAgICBpZiBAZGF0YUFjY2Vzc29ycy5pc0RlcChjaGlsZERhdGEpIGFuZCAoKGkgPCBjaGlsZHJlbkRhdGEubGVuZ3RoIC0gMSBhbmQgQGRhdGFBY2Nlc3NvcnMuaXNEZXAoY2hpbGRyZW5EYXRhW2kgKyAxXSkpIG9yIChpID4gMCBhbmQgQGRhdGFBY2Nlc3NvcnMuaXNEZXAoY2hpbGRyZW5EYXRhW2kgLSAxXSkpKVxuICAgICAgICAgIGNoaWxkT3B0cyA9IF8ubWVyZ2UgeyB0cmVlRGVwSGFzU3Vycm91bmRpbmdEZXBzOiB0cnVlIH0sIEBvcHRpb25zXG5cbiAgICAgICAgY2hpbGRUcmVlID0gbmV3IFN0YWNrVHJlZUNvbnRhaW5lcihjaGlsZERhdGEsIEBkYXRhQWNjZXNzb3JzLCBAX2hlYWRlclByb3ZpZGVyQ2xhc3MsIGNoaWxkT3B0cywgQGRlcHRoICsgMSlcbiAgICAgICAgQF90cmVlQ2hpbGRyZW5Db21wb25lbnQuYWRkQ2hpbGQgY2hpbGRUcmVlXG4gICAgICAgIEBfY2hpbGRUcmVlcy5wdXNoIGNoaWxkVHJlZVxuXG4gIGdldERlZmF1bHRPcHRpb25zOiAtPiBfLm1lcmdlIHN1cGVyKCksIHRyZWVGbGF0TWFyZ2luOiAyMCwgdHJlZU5lc3RlZE1hcmdpbjogNSwgdHJlZURlcHRoU2hpZnQ6IDMwLCB0cmVlV2lkdGg6IDMwMCwgdHJlZVBhcmVudExpbmVNYXJnaW46IDEwLCB0cmVlTGluZUNsYXNzOiAndHJlZS1saW5lJ1xuXG4gIHJlbmRlclRvOiAoX3BhcmVudEVsKSAtPlxuICAgIHN1cGVyIF9wYXJlbnRFbFxuICAgICMgU2hpZnQgc3VidHJlZVxuICAgIGlmIEBfdHJlZUNoaWxkcmVuQ29tcG9uZW50XG4gICAgICBAX3RyZWVDaGlsZHJlbkNvbXBvbmVudC5tb3ZlQnkgQG9wdGlvbnMudHJlZURlcHRoU2hpZnQsIDBcblxuICB0b2dnbGVDb2xsYXBzZTogLT5cbiAgICByZXR1cm4gdW5sZXNzIEBfdHJlZUNoaWxkcmVuQ29tcG9uZW50XG4gICAgQF90cmVlQ2hpbGRyZW5Db21wb25lbnQuZmFkZVRvZ2dsZSA9PiBAX2FycmFuZ2UgdHJ1ZVxuXG4gIF9hcnJhbmdlOiAoYW5pbWF0ZSkgLT5cbiAgICBzdXBlciBhbmltYXRlXG4gICAgIyBEcmF3IGNoaWxkIGxpbmUgaWYgaXMgY2hpbGRyZW5cbiAgICBAX2RyYXdDaGlsZExpbmUgYW5pbWF0ZSBpZiBAZGVwdGggPiAwXG4gICAgIyBEcmF3IHBhcmVudCBsaW5lIGlmIGhhcyBjaGlsZHJlblxuICAgIEBfZHJhd1BhcmVudExpbmUgYW5pbWF0ZSBpZiBAX3RyZWVDaGlsZHJlbkNvbXBvbmVudFxuXG4gIF9kcmF3Q2hpbGRMaW5lOiAoYW5pbWF0ZSkgLT5cbiAgICBoID0gQF9oZWFkZXJDb21wb25lbnQuZ2V0SGVpZ2h0KCkgLyAyXG4gICAgZCA9IEBvcHRpb25zLnRyZWVEZXB0aFNoaWZ0IC0gQG9wdGlvbnMudHJlZVBhcmVudExpbmVNYXJnaW5cbiAgICBwb2ludHMgPSBbWzAsIGhdLCBbLWQsIGhdXVxuICAgIGlmIG5vdCBAX2NoaWxkTGluZVxuICAgICAgQF9jaGlsZExpbmUgPSBAX2hlYWRlckNvbXBvbmVudC5fZWwucG9seWxpbmUocG9pbnRzKS5hZGRDbGFzcyhAb3B0aW9ucy50cmVlTGluZUNsYXNzKVxuICAgIGVsc2VcbiAgICAgIEBfYW5pbWF0ZShAX2NoaWxkTGluZSwgYW5pbWF0ZSkucGxvdChwb2ludHMpXG4gICAgXG4gIF9kcmF3UGFyZW50TGluZTogKGFuaW1hdGUpIC0+XG4gICAgIyBDYWxjdWxhdGUgcGFyZW50IGxpbmUgaGVpZ2h0XG4gICAgaCA9IDBcbiAgICBpZiBAX2NoaWxkVHJlZXMubGVuZ3RoID4gMVxuICAgICAgZm9yIGNoaWxkVHJlZSBpbiBAX2NoaWxkVHJlZXNbMC4uQF9jaGlsZFRyZWVzLmxlbmd0aCAtIDJdXG4gICAgICAgIGggKz0gY2hpbGRUcmVlLmdldEhlaWdodCgpICsgQG9wdGlvbnMudHJlZUZsYXRNYXJnaW5cblxuICAgICMgVE9ETyBSZWZhY3RvciBsaW5lIGNvbnRpbnVhdGlvblxuICAgIGlmIEBvcHRpb25zLnRyZWVSb290TGluZVRvRW5kIGFuZCBAZGVwdGggaXMgMFxuICAgICAgaCArPSBAX2NoaWxkVHJlZXNbQF9jaGlsZFRyZWVzLmxlbmd0aCAtIDFdLmdldEhlaWdodCgpXG4gICAgZWxzZVxuICAgICAgaCArPSBAX2NoaWxkVHJlZXNbQF9jaGlsZFRyZWVzLmxlbmd0aCAtIDFdLl9oZWFkZXJDb21wb25lbnQuZ2V0SGVpZ2h0KCkgLyAyXG5cbiAgICBkID0gQG9wdGlvbnMudHJlZURlcHRoU2hpZnQgLSBAb3B0aW9ucy50cmVlUGFyZW50TGluZU1hcmdpblxuXG4gICAgcG9pbnRzID0gW1stZCwgLUBvcHRpb25zLnRyZWVOZXN0ZWRNYXJnaW5dLCBbLWQsIGhdXVxuICAgIGlmIG5vdCBAX3BhcmVudExpbmVcbiAgICAgIEBfcGFyZW50TGluZSA9IEBfdHJlZUNoaWxkcmVuQ29tcG9uZW50Ll9lbC5wb2x5bGluZShwb2ludHMpLmFkZENsYXNzKEBvcHRpb25zLnRyZWVMaW5lQ2xhc3MpXG4gICAgZWxzZVxuICAgICAgQF9hbmltYXRlKEBfcGFyZW50TGluZSwgYW5pbWF0ZSkucGxvdChwb2ludHMpXG5cbmNsYXNzIFN0YWNrVHJlZUhlYWRlclByb3ZpZGVyXG4gIGNvbnN0cnVjdG9yOiAoQHRyZWUpIC0+XG5cbiAgY3JlYXRlSGVhZGVyOiAtPlxuICAgIGlmIEB0cmVlLmRhdGFBY2Nlc3NvcnMuaXNEZXAgQHRyZWUuZGF0YVxuICAgICAgbmV3IFN0YWNrSHRtbERlcEVsZW1lbnQgQHRyZWUuZGF0YUFjY2Vzc29ycy5nZXRDb250ZW50KEB0cmVlLmRhdGEpLCBAdHJlZS5kYXRhQWNjZXNzb3JzLmdldERlcENvbnRlbnQoQHRyZWUuZGF0YSksXG4gICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiBAdHJlZS5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uXG4gICAgICAgIGRlcE1haW5XaWR0aDogQHRyZWUub3B0aW9ucy50cmVlV2lkdGhcbiAgICAgICAgZGVwV2lkdGg6IEB0cmVlLm9wdGlvbnMudHJlZVdpZHRoIC0gQHRyZWUub3B0aW9ucy50cmVlRGVwdGhTaGlmdCAqIEB0cmVlLmRlcHRoXG4gICAgICAgIGRlcElnbm9yZURlcEhlaWdodDogbm90IEB0cmVlLm9wdGlvbnMudHJlZURlcEhhc1N1cnJvdW5kaW5nRGVwc1xuICAgICAgICBkZXBEYXNoYXJyYXk6IEB0cmVlLm9wdGlvbnMudHJlZURlcERhc2hhcnJheVxuICAgICAgICBkZXBMaW5lQ2xhc3M6IEB0cmVlLm9wdGlvbnMudHJlZUxpbmVDbGFzc1xuICAgIGVsc2VcbiAgICAgIGhlYWRlciA9IG5ldyBTdGFja0h0bWxFbGVtZW50IEB0cmVlLmRhdGFBY2Nlc3NvcnMuZ2V0Q29udGVudChAdHJlZS5kYXRhKSxcbiAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IEB0cmVlLm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb25cbiAgICAgICAgaHRtbFdpZHRoOiBAdHJlZS5vcHRpb25zLnRyZWVXaWR0aCAtIEB0cmVlLm9wdGlvbnMudHJlZURlcHRoU2hpZnQgKiBAdHJlZS5kZXB0aFxuICAgICAgaWYgQHRyZWUuZGVwdGggaXMgMCBhbmQgKGFkZGl0aW9uYWxDb250ZW50ID0gQHRyZWUuZGF0YUFjY2Vzc29ycy5nZXRSb290SGVhZGVyQWRkaXRpb25hbENvbnRlbnQoQHRyZWUuZGF0YSkpXG4gICAgICAgIGggPSBuZXcgU3RhY2tWZXJ0aWNhbENvbnRhaW5lclxuICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiBAdHJlZS5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uXG4gICAgICAgICAgdmVydE1hcmdpbjogQHRyZWUub3B0aW9ucy50cmVlV2lkdGhcbiAgICAgICAgIyBuZXcgU3RhY2tIdG1sRWxlbWVudCAnPGgxPltyb290XTwvaDE+JyArIEB0cmVlLmRhdGFBY2Nlc3NvcnMuZ2V0Q29udGVudChAdHJlZS5kYXRhKSxcbiAgICAgICAgIyAgIGFuaW1hdGlvbkR1cmF0aW9uOiBAdHJlZS5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uXG4gICAgICAgICMgICBodG1sV2lkdGg6IEB0cmVlLm9wdGlvbnMudHJlZVdpZHRoIC0gQHRyZWUub3B0aW9ucy50cmVlRGVwdGhTaGlmdCAqIEB0cmVlLmRlcHRoXG4gICAgICAgIGhlYWRlckFkZGl0aW9uID0gbmV3IFN0YWNrSHRtbEVsZW1lbnQgYWRkaXRpb25hbENvbnRlbnQsXG4gICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IEB0cmVlLm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb25cbiAgICAgICAgICBodG1sV2lkdGg6IEB0cmVlLm9wdGlvbnMudHJlZVdpZHRoXG4gICAgICAgICAgaHRtbFJlY3Q6IGZhbHNlXG4gICAgICAgIGYgPSAtPlxuICAgICAgICAgIHJhbmRoID0gLT4gXCI8ZGl2IHN0eWxlPSdoZWlnaHQ6ICN7TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNSkgKiA1MH1weCc+QTwvZGl2PlwiXG4gICAgICAgICAgaGVhZGVyLnVwZGF0ZUNvbnRlbnQgcmFuZGgoKVxuICAgICAgICAgIGhlYWRlckFkZGl0aW9uLnVwZGF0ZUNvbnRlbnQgcmFuZGgoKVxuICAgICAgICBoZWFkZXIub24gJ2NsaWNrJywgZlxuICAgICAgICBoZWFkZXJBZGRpdGlvbi5vbiAnY2xpY2snLCBmXG4gICAgICAgIGguYWRkQ2hpbGQgaGVhZGVyXG4gICAgICAgIGguYWRkQ2hpbGQgaGVhZGVyQWRkaXRpb25cbiAgICAgICAgaFxuICAgICAgZWxzZVxuICAgICAgICBoZWFkZXJcbiJdfQ==