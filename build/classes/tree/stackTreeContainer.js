var StackTreeContainer, StackTreeHeaderProvider,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

StackTreeContainer = (function(superClass) {
  extend(StackTreeContainer, superClass);

  function StackTreeContainer(data, dataAccessors, _headerProviderClass, options, depth) {
    var childrenData, unbindedData;
    this.data = data;
    this.dataAccessors = dataAccessors;
    this._headerProviderClass = _headerProviderClass;
    this.depth = depth != null ? depth : 0;
    StackTreeContainer.__super__.constructor.call(this, options);
    this.options.groupChildMargin = this.depth === 0 ? this.options.treeRootNestedMargin : this.options.treeNestedMargin;
    this._headerProvider = new this._headerProviderClass(this);
    this.collapsed = false;
    this.__collapsedCallbacks = [];
    this._headerComponent = this._headerProvider.createHeader();
    this._headerComponent.tree = this;
    this.addChild(this._headerComponent);
    childrenData = this.dataAccessors.getChildrenArray(this.data);
    unbindedData = this.dataAccessors.getUnbindedArray(this.data);
    this._rootLineToEnd = !!unbindedData;
    if (childrenData || unbindedData) {
      this._treeAllChildrenComponent = this.addChild(new StackContainer({
        groupChildMargin: 0,
        animationDuration: this.options.animationDuration
      }));
      if (childrenData) {
        this._treeOwnChildrenComponent = this._treeAllChildrenComponent.addChild(new StackContainer({
          groupChildMargin: this.options.treeFlatMargin,
          animationDuration: this.options.animationDuration
        }));
        this._childTrees = [];
        this._addTrees(childrenData, this._childTrees, this._treeOwnChildrenComponent);
      }
      if (unbindedData) {
        this._unbindedTrees = [];
        this._treeAllChildrenComponent.addChild(new StructureTreeUnbindedX({
          xMargin: -(this.options.treeDepthShift - this.options.treeParentLineMargin),
          animationDuration: this.options.animationDuration
        }));
        this._treeUnbindedChildrenComponent = this._treeAllChildrenComponent.addChild(new StackContainer({
          groupChildMargin: 0,
          animationDuration: this.options.animationDuration
        }));
        this._treeUnbindedChildrenComponent.addChild(new StackHtmlElement("<div style='width: " + (this.options.treeWidth - this.options.treeDepthShift) + "px; text-align: right; font-size: 12px; margin-bottom: 5px; color: red;'>unbinded</div>", {
          htmlRect: false,
          htmlWidth: this.options.treeWidth - this.options.treeDepthShift,
          htmlMinHeight: null,
          htmlPadding: 0,
          animationDuration: this.options.animationDuration
        }));
        this._treeUnbindedChildrenTreesComponent = this._treeUnbindedChildrenComponent.addChild(new StackContainer({
          groupChildMargin: this.options.treeFlatMargin,
          animationDuration: this.options.animationDuration
        }));
        this._addTrees(unbindedData, this._unbindedTrees, this._treeUnbindedChildrenTreesComponent, {
          treeDrawChildLine: false,
          treeRectFill: this.options.treeUnbindedRectFill,
          treeRectStrokeColor: this.options.treeUnbindedRectStrokeColor,
          treeRectStrokeDasharray: this.options.treeUnbindedRectStrokeDasharray
        });
      }
    }
  }

  StackTreeContainer.prototype._addTrees = function(childrenData, arrayToStore, container, options) {
    var childData, childOpts, childTree, i, j, ref, results;
    results = [];
    for (i = j = 0, ref = childrenData.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      childData = childrenData[i];
      childOpts = _.clone(this.options);
      _.merge(childOpts, {
        treeDrawChildLine: true
      });
      if (this.dataAccessors.isDep(childData) && ((i < childrenData.length - 1 && this.dataAccessors.isDep(childrenData[i + 1])) || (i > 0 && this.dataAccessors.isDep(childrenData[i - 1])))) {
        _.merge(childOpts, {
          treeDepHasSurroundingDeps: true
        });
      }
      _.merge(childOpts, options);
      childTree = new StackTreeContainer(childData, this.dataAccessors, this._headerProviderClass, childOpts, this.depth + 1);
      container.addChild(childTree);
      results.push(arrayToStore.push(childTree));
    }
    return results;
  };

  StackTreeContainer.prototype.getDefaultOptions = function() {
    return _.merge(StackTreeContainer.__super__.getDefaultOptions.call(this), {
      treeFlatMargin: 20,
      treeNestedMargin: 5,
      treeRootNestedMargin: 50,
      treeDepthShift: 30,
      treeWidth: 300,
      treeParentLineMargin: 10,
      treeDrawChildLine: true,
      treeLineStroke: 'gray',
      treeUnbindedLineStroke: 'red',
      treeRectFill: '#EEF',
      treeRectStrokeColor: 'gray',
      treeStrokeDasharray: 'none',
      treeUnbindedRectFill: '#FFA',
      treeUnbindedRectStrokeColor: 'red',
      treeUnbindedRectStrokeDasharray: '10 5'
    });
  };

  StackTreeContainer.prototype.renderTo = function(_parentEl) {
    StackTreeContainer.__super__.renderTo.call(this, _parentEl);
    if (this._treeAllChildrenComponent) {
      return this._treeAllChildrenComponent.moveBy(this.options.treeDepthShift, 0);
    }
  };

  StackTreeContainer.prototype.collapsible = function() {
    var ref;
    return ((ref = this.dataAccessors.getChildrenArray(this.data)) != null ? ref.length : void 0) > 0 && this.depth > 0;
  };

  StackTreeContainer.prototype.toggleCollapse = function() {
    if (!this.collapsible()) {
      return;
    }
    this.collapsed = !this.collapsed;
    this._fireCollapsed();
    if (!this._treeOwnChildrenComponent) {
      return;
    }
    return this._treeAllChildrenComponent.fadeToggle((function(_this) {
      return function() {
        return _this._arrange(true);
      };
    })(this));
  };

  StackTreeContainer.prototype._arrange = function(animate) {
    StackTreeContainer.__super__._arrange.call(this, animate);
    if (this.options.treeDrawChildLine) {
      this._drawChildLine(animate);
    }
    if (this._treeOwnChildrenComponent) {
      this._drawParentLine(animate);
    }
    if (this._treeUnbindedChildrenComponent) {
      return this._drawUnbindedLine(animate);
    }
  };

  StackTreeContainer.prototype._drawUnbindedLine = function(animate) {
    var d, h, points;
    d = this.options.treeDepthShift - this.options.treeParentLineMargin;
    h = this._treeUnbindedChildrenComponent.getHeight();
    points = [[-d, 0], [-d, h]];
    if (!this._unbindedLine) {
      return this._unbindedLine = this._treeUnbindedChildrenComponent._el.polyline(points).stroke(this.options.treeUnbindedLineStroke);
    } else {
      return this._animate(this._unbindedLine, animate).plot(points);
    }
  };

  StackTreeContainer.prototype._drawChildLine = function(animate) {
    var d, h, points;
    h = this._headerComponent.getHeight() / 2;
    d = this.options.treeDepthShift - this.options.treeParentLineMargin;
    points = [[0, h], [-d, h]];
    if (!this._childLine) {
      return this._childLine = this._headerComponent._el.polyline(points).stroke(this.options.treeLineStroke);
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
    if (this._rootLineToEnd && this.depth === 0) {
      h += this._childTrees[this._childTrees.length - 1].getHeight();
    } else {
      h += this._childTrees[this._childTrees.length - 1]._headerComponent.getHeight() / 2;
    }
    d = this.options.treeDepthShift - this.options.treeParentLineMargin;
    points = [[-d, -this.options.groupChildMargin], [-d, h]];
    if (!this._parentLine) {
      return this._parentLine = this._treeOwnChildrenComponent._el.polyline(points).stroke(this.options.treeLineStroke);
    } else {
      return this._animate(this._parentLine, animate).plot(points);
    }
  };

  StackTreeContainer.prototype.onCollapsed = function(cb) {
    return this.__collapsedCallbacks.push(cb);
  };

  StackTreeContainer.prototype._fireCollapsed = function() {
    var args, cb, j, len, ref, results;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    ref = this.__collapsedCallbacks;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      cb = ref[j];
      results.push(cb(this, this.collapsed));
    }
    return results;
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
        depLineStroke: this.tree.options.treeLineStroke
      });
    } else {
      if (this.tree.collapsible()) {
        header = new StackHtmlElementWithCollapser(this.tree.dataAccessors.getContent(this.tree.data), this.tree, {
          animationDuration: this.tree.options.animationDuration,
          htmlWidth: this.tree.options.treeWidth - this.tree.options.treeDepthShift * this.tree.depth,
          htmlRectFill: this.tree.options.treeRectFill,
          htmlRectStrokeColor: this.tree.options.treeRectStrokeColor,
          htmlRectStrokeDasharray: this.tree.options.treeRectStrokeDasharray
        });
      } else {
        header = new StackHtmlElement(this.tree.dataAccessors.getContent(this.tree.data), {
          animationDuration: this.tree.options.animationDuration,
          htmlWidth: this.tree.options.treeWidth - this.tree.options.treeDepthShift * this.tree.depth,
          htmlRectFill: this.tree.options.treeRectFill,
          htmlRectStrokeColor: this.tree.options.treeRectStrokeColor,
          htmlRectStrokeDasharray: this.tree.options.treeRectStrokeDasharray
        });
      }
      if (this.tree.depth === 0 && (additionalContent = this.tree.dataAccessors.getRootHeaderAdditionalContent(this.tree.data))) {
        h = new StackVerticalContainer({
          animationDuration: this.tree.options.animationDuration,
          vertMargin: this.tree.options.treeWidth
        });
        headerAddition = new StackHtmlElement(additionalContent, {
          animationDuration: this.tree.options.animationDuration,
          htmlWidth: this.tree.options.treeWidth,
          htmlRect: false,
          ignoreHeight: true
        });
        header.prepended.push('<div>1</div>');
        header.prepended.push('<div>2</div>');
        header.appended.push('<div>3</div>');
        header.appended.push('<div>4</div>');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvdHJlZS9zdGFja1RyZWVDb250YWluZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsMkNBQUE7RUFBQTs7OztBQUFNOzs7RUFNUyw0QkFBQyxJQUFELEVBQVEsYUFBUixFQUF3QixvQkFBeEIsRUFBK0MsT0FBL0MsRUFBd0QsS0FBeEQ7QUFDWCxRQUFBO0lBRFksSUFBQyxDQUFBLE9BQUQ7SUFBTyxJQUFDLENBQUEsZ0JBQUQ7SUFBZ0IsSUFBQyxDQUFBLHVCQUFEO0lBQWdDLElBQUMsQ0FBQSx3QkFBRCxRQUFTO0lBQzVFLG9EQUFNLE9BQU47SUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLGdCQUFULEdBQStCLElBQUMsQ0FBQSxLQUFELEtBQVUsQ0FBYixHQUFvQixJQUFDLENBQUEsT0FBTyxDQUFDLG9CQUE3QixHQUF1RCxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQzVGLElBQUMsQ0FBQSxlQUFELEdBQXVCLElBQUEsSUFBQyxDQUFBLG9CQUFELENBQXNCLElBQXRCO0lBQ3ZCLElBQUMsQ0FBQSxTQUFELEdBQWE7SUFDYixJQUFDLENBQUEsb0JBQUQsR0FBd0I7SUFHeEIsSUFBQyxDQUFBLGdCQUFELEdBQW9CLElBQUMsQ0FBQSxlQUFlLENBQUMsWUFBakIsQ0FBQTtJQUNwQixJQUFDLENBQUEsZ0JBQWdCLENBQUMsSUFBbEIsR0FBeUI7SUFFekIsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsZ0JBQVg7SUFJQSxZQUFBLEdBQWUsSUFBQyxDQUFBLGFBQWEsQ0FBQyxnQkFBZixDQUFnQyxJQUFDLENBQUEsSUFBakM7SUFDZixZQUFBLEdBQWUsSUFBQyxDQUFBLGFBQWEsQ0FBQyxnQkFBZixDQUFnQyxJQUFDLENBQUEsSUFBakM7SUFDZixJQUFDLENBQUEsY0FBRCxHQUFrQixDQUFDLENBQUM7SUFDcEIsSUFBRyxZQUFBLElBQWdCLFlBQW5CO01BQ0UsSUFBQyxDQUFBLHlCQUFELEdBQTZCLElBQUMsQ0FB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akIsQ0FBc0IsY0FBdEI7UUFDQSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQWpCLENBQXNCLGNBQXRCO1FBQ0EsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFoQixDQUFxQixjQUFyQjtRQUNBLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBaEIsQ0FBcUIsY0FBckI7UUFDQSxDQUFBLEdBQUksU0FBQTtBQUNGLGNBQUE7VUFBQSxLQUFBLEdBQVEsU0FBQTttQkFBRyxzQkFBQSxHQUFzQixDQUFDLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLENBQTNCLENBQUEsR0FBZ0MsRUFBakMsQ0FBdEIsR0FBMEQ7VUFBN0Q7VUFDUixNQUFNLENBQUMsYUFBUCxDQUFxQixLQUFBLENBQUEsQ0FBckI7aUJBQ0EsY0FBYyxDQUFDLGFBQWYsQ0FBNkIsS0FBQSxDQUFBLENBQTdCO1FBSEU7UUFJSixNQUFNLENBQUMsRUFBUCxDQUFVLE9BQVYsRUFBbUIsQ0FBbkI7UUFDQSxjQUFjLENBQUMsRUFBZixDQUFrQixPQUFsQixFQUEyQixDQUEzQjtRQUVBLENBQUMsQ0FBQyxRQUFGLENBQVcsTUFBWDtRQUNBLENBQUMsQ0FBQyxRQUFGLENBQVcsY0FBWDtlQUNBLEVBM0JGO09BQUEsTUFBQTtlQTZCRSxPQTdCRjtPQXZCRjs7RUFEWSIsImZpbGUiOiJjbGFzc2VzL3RyZWUvc3RhY2tUcmVlQ29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3RhY2tUcmVlQ29udGFpbmVyIGV4dGVuZHMgU3RhY2tDb250YWluZXJcbiAgIyBUT0RPIE1heWJlIGdldCBvdXQgdGhlIGNvZGUgd2hpY2ggaXMgYmluZGVkIHdpdGggZGF0YSBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIChpLmUuIGRlcHMpXG4gICMgVE9ETyAwLWxldmVsIGNoaWxkIG1hcmdpbiBzaG91bGQgYmUgZ3JlYXRlciBhcyBvbiBwaG90b1xuICAjIFRPRE8gUGFyZW50IFNWRyByZXNpemluZ1xuICAjIFRPRE8gW0RPTkVdIEFuaW1hdGUgKGNoYW5nZSBsaW5lcyB0byBwb2x5bGluZXMpXG4gICMgVE9ETyBbRE9ORV0gRGVwIGVsZW1lbnQgcmlnaHQgYXJyYW5naW5nXG4gIGNvbnN0cnVjdG9yOiAoQGRhdGEsIEBkYXRhQWNjZXNzb3JzLCBAX2hlYWRlclByb3ZpZGVyQ2xhc3MsIG9wdGlvbnMsIEBkZXB0aCA9IDApIC0+XG4gICAgc3VwZXIgb3B0aW9uc1xuICAgIEBvcHRpb25zLmdyb3VwQ2hpbGRNYXJnaW4gPSBpZiBAZGVwdGggaXMgMCB0aGVuIEBvcHRpb25zLnRyZWVSb290TmVzdGVkTWFyZ2luIGVsc2UgQG9wdGlvbnMudHJlZU5lc3RlZE1hcmdpblxuICAgIEBfaGVhZGVyUHJvdmlkZXIgPSBuZXcgQF9oZWFkZXJQcm92aWRlckNsYXNzIEBcbiAgICBAY29sbGFwc2VkID0gZmFsc2VcbiAgICBAX19jb2xsYXBzZWRDYWxsYmFja3MgPSBbXVxuXG4gICAgIyBDcmVhdGUgaGVhZGVyXG4gICAgQF9oZWFkZXJDb21wb25lbnQgPSBAX2hlYWRlclByb3ZpZGVyLmNyZWF0ZUhlYWRlcigpXG4gICAgQF9oZWFkZXJDb21wb25lbnQudHJlZSA9IEAgIyBkZWJ1Z1xuICAgICMgVE9ETyB0aGluayBob3cgdG8gYmluZCB0byBkb20gcmlnaHRseVxuICAgIEBhZGRDaGlsZCBAX2hlYWRlckNvbXBvbmVudFxuXG5cbiAgICAjIENyZWF0ZSBjaGlsZHJlblxuICAgIGNoaWxkcmVuRGF0YSA9IEBkYXRhQWNjZXNzb3JzLmdldENoaWxkcmVuQXJyYXkgQGRhdGFcbiAgICB1bmJpbmRlZERhdGEgPSBAZGF0YUFjY2Vzc29ycy5nZXRVbmJpbmRlZEFycmF5IEBkYXRhXG4gICAgQF9yb290TGluZVRvRW5kID0gISF1bmJpbmRlZERhdGFcbiAgICBpZiBjaGlsZHJlbkRhdGEgb3IgdW5iaW5kZWREYXRhXG4gICAgICBAX3RyZWVBbGxDaGlsZHJlbkNvbXBvbmVudCA9IEBhZGRDaGlsZCBuZXcgU3RhY2tDb250YWluZXIgZ3JvdXBDaGlsZE1hcmdpbjogMCwgYW5pbWF0aW9uRHVyYXRpb246IEBvcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uXG4gICAgICBpZiBjaGlsZHJlbkRhdGFcbiAgICAgICAgQF90cmVlT3duQ2hpbGRyZW5Db21wb25lbnQgPSBAX3RyZWVBbGxDaGlsZHJlbkNvbXBvbmVudC5hZGRDaGlsZCBuZXcgU3RhY2tDb250YWluZXIgZ3JvdXBDaGlsZE1hcmdpbjogQG9wdGlvbnMudHJlZUZsYXRNYXJnaW4sIGFuaW1hdGlvbkR1cmF0aW9uOiBAb3B0aW9ucy5hbmltYXRpb25EdXJhdGlvblxuICAgICAgICBAX2NoaWxkVHJlZXMgPSBbXVxuICAgICAgICBAX2FkZFRyZWVzIGNoaWxkcmVuRGF0YSwgQF9jaGlsZFRyZWVzLCBAX3RyZWVPd25DaGlsZHJlbkNvbXBvbmVudFxuXG4gICAgICBpZiB1bmJpbmRlZERhdGFcbiAgICAgICAgQF91bmJpbmRlZFRyZWVzID0gW11cbiAgICAgICAgQF90cmVlQWxsQ2hpbGRyZW5Db21wb25lbnQuYWRkQ2hpbGQgbmV3IFN0cnVjdHVyZVRyZWVVbmJpbmRlZFggeE1hcmdpbjogLShAb3B0aW9ucy50cmVlRGVwdGhTaGlmdCAtIEBvcHRpb25zLnRyZWVQYXJlbnRMaW5lTWFyZ2luKSwgYW5pbWF0aW9uRHVyYXRpb246IEBvcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uXG4gICAgICAgIEBfdHJlZVVuYmluZGVkQ2hpbGRyZW5Db21wb25lbnQgPSBAX3RyZWVBbGxDaGlsZHJlbkNvbXBvbmVudC5hZGRDaGlsZCBuZXcgU3RhY2tDb250YWluZXIgZ3JvdXBDaGlsZE1hcmdpbjogMCwgYW5pbWF0aW9uRHVyYXRpb246IEBvcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uXG4gICAgICAgIEBfdHJlZVVuYmluZGVkQ2hpbGRyZW5Db21wb25lbnQuYWRkQ2hpbGQgbmV3IFN0YWNrSHRtbEVsZW1lbnQgXCI8ZGl2IHN0eWxlPSd3aWR0aDogI3tAb3B0aW9ucy50cmVlV2lkdGggLSBAb3B0aW9ucy50cmVlRGVwdGhTaGlmdH1weDsgdGV4dC1hbGlnbjogcmlnaHQ7IGZvbnQtc2l6ZTogMTJweDsgbWFyZ2luLWJvdHRvbTogNXB4OyBjb2xvcjogcmVkOyc+dW5iaW5kZWQ8L2Rpdj5cIiwgaHRtbFJlY3Q6IGZhbHNlLCBodG1sV2lkdGg6IEBvcHRpb25zLnRyZWVXaWR0aCAtIEBvcHRpb25zLnRyZWVEZXB0aFNoaWZ0LCBodG1sTWluSGVpZ2h0OiBudWxsLCBodG1sUGFkZGluZzogMCwgYW5pbWF0aW9uRHVyYXRpb246IEBvcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uXG4gICAgICAgIEBfdHJlZVVuYmluZGVkQ2hpbGRyZW5UcmVlc0NvbXBvbmVudCA9IEBfdHJlZVVuYmluZGVkQ2hpbGRyZW5Db21wb25lbnQuYWRkQ2hpbGQgbmV3IFN0YWNrQ29udGFpbmVyIGdyb3VwQ2hpbGRNYXJnaW46IEBvcHRpb25zLnRyZWVGbGF0TWFyZ2luLCBhbmltYXRpb25EdXJhdGlvbjogQG9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb25cbiAgICAgICAgQF9hZGRUcmVlcyB1bmJpbmRlZERhdGEsIEBfdW5iaW5kZWRUcmVlcywgQF90cmVlVW5iaW5kZWRDaGlsZHJlblRyZWVzQ29tcG9uZW50LCB0cmVlRHJhd0NoaWxkTGluZTogZmFsc2UsIHRyZWVSZWN0RmlsbDogQG9wdGlvbnMudHJlZVVuYmluZGVkUmVjdEZpbGwsIHRyZWVSZWN0U3Ryb2tlQ29sb3I6IEBvcHRpb25zLnRyZWVVbmJpbmRlZFJlY3RTdHJva2VDb2xvciwgdHJlZVJlY3RTdHJva2VEYXNoYXJyYXk6IEBvcHRpb25zLnRyZWVVbmJpbmRlZFJlY3RTdHJva2VEYXNoYXJyYXlcblxuICBfYWRkVHJlZXM6IChjaGlsZHJlbkRhdGEsIGFycmF5VG9TdG9yZSwgY29udGFpbmVyLCBvcHRpb25zKSAtPlxuICAgIGZvciBpIGluIFswLi4uY2hpbGRyZW5EYXRhLmxlbmd0aF1cbiAgICAgIGNoaWxkRGF0YSA9IGNoaWxkcmVuRGF0YVtpXVxuICAgICAgY2hpbGRPcHRzID0gXy5jbG9uZSBAb3B0aW9uc1xuICAgICAgXy5tZXJnZSBjaGlsZE9wdHMsIHRyZWVEcmF3Q2hpbGRMaW5lOiB0cnVlXG4gICAgICAjIElmIHRyZWUgaGFzIHJpZ2h0IHNpZGUgJiBoYXMgc3VjaCBzdXJyb3VuZGluZyB0cmVlcywgd2UgbmVlZCB0byBjb25zaWRlciBpdHMgcmlnaHQgc2lkZSBoZWlnaHRcbiAgICAgIGlmIEBkYXRhQWNjZXNzb3JzLmlzRGVwKGNoaWxkRGF0YSkgYW5kICgoaSA8IGNoaWxkcmVuRGF0YS5sZW5ndGggLSAxIGFuZCBAZGF0YUFjY2Vzc29ycy5pc0RlcChjaGlsZHJlbkRhdGFbaSArIDFdKSkgb3IgKGkgPiAwIGFuZCBAZGF0YUFjY2Vzc29ycy5pc0RlcChjaGlsZHJlbkRhdGFbaSAtIDFdKSkpXG4gICAgICAgIF8ubWVyZ2UgY2hpbGRPcHRzLCB7IHRyZWVEZXBIYXNTdXJyb3VuZGluZ0RlcHM6IHRydWUgfVxuICAgICAgXy5tZXJnZSBjaGlsZE9wdHMsIG9wdGlvbnNcbiAgICAgIGNoaWxkVHJlZSA9IG5ldyBTdGFja1RyZWVDb250YWluZXIoY2hpbGREYXRhLCBAZGF0YUFjY2Vzc29ycywgQF9oZWFkZXJQcm92aWRlckNsYXNzLCBjaGlsZE9wdHMsIEBkZXB0aCArIDEpXG4gICAgICBjb250YWluZXIuYWRkQ2hpbGQgY2hpbGRUcmVlXG4gICAgICBhcnJheVRvU3RvcmUucHVzaCBjaGlsZFRyZWVcblxuICBnZXREZWZhdWx0T3B0aW9uczogLT4gXy5tZXJnZSBzdXBlcigpLCB0cmVlRmxhdE1hcmdpbjogMjAsIHRyZWVOZXN0ZWRNYXJnaW46IDUsIHRyZWVSb290TmVzdGVkTWFyZ2luOiA1MCwgdHJlZURlcHRoU2hpZnQ6IDMwLCB0cmVlV2lkdGg6IDMwMCwgdHJlZVBhcmVudExpbmVNYXJnaW46IDEwLCB0cmVlRHJhd0NoaWxkTGluZTogdHJ1ZSwgdHJlZUxpbmVTdHJva2U6ICdncmF5JywgdHJlZVVuYmluZGVkTGluZVN0cm9rZTogJ3JlZCcsIHRyZWVSZWN0RmlsbDogJyNFRUYnLCB0cmVlUmVjdFN0cm9rZUNvbG9yOiAnZ3JheScsIHRyZWVTdHJva2VEYXNoYXJyYXk6ICdub25lJywgdHJlZVVuYmluZGVkUmVjdEZpbGw6ICcjRkZBJywgdHJlZVVuYmluZGVkUmVjdFN0cm9rZUNvbG9yOiAncmVkJywgdHJlZVVuYmluZGVkUmVjdFN0cm9rZURhc2hhcnJheTogJzEwIDUnXG5cbiAgcmVuZGVyVG86IChfcGFyZW50RWwpIC0+XG4gICAgc3VwZXIgX3BhcmVudEVsXG4gICAgIyBTaGlmdCBzdWJ0cmVlXG4gICAgaWYgQF90cmVlQWxsQ2hpbGRyZW5Db21wb25lbnRcbiAgICAgIEBfdHJlZUFsbENoaWxkcmVuQ29tcG9uZW50Lm1vdmVCeSBAb3B0aW9ucy50cmVlRGVwdGhTaGlmdCwgMFxuXG4gIGNvbGxhcHNpYmxlOiAtPiBAZGF0YUFjY2Vzc29ycy5nZXRDaGlsZHJlbkFycmF5KEBkYXRhKT8ubGVuZ3RoID4gMCBhbmQgQGRlcHRoID4gMFxuXG4gIHRvZ2dsZUNvbGxhcHNlOiAtPlxuICAgIHJldHVybiB1bmxlc3MgQGNvbGxhcHNpYmxlKClcbiAgICBAY29sbGFwc2VkID0gbm90IEBjb2xsYXBzZWRcbiAgICBAX2ZpcmVDb2xsYXBzZWQoKVxuICAgIHJldHVybiB1bmxlc3MgQF90cmVlT3duQ2hpbGRyZW5Db21wb25lbnRcbiAgICBAX3RyZWVBbGxDaGlsZHJlbkNvbXBvbmVudC5mYWRlVG9nZ2xlID0+IEBfYXJyYW5nZSB0cnVlXG5cbiAgX2FycmFuZ2U6IChhbmltYXRlKSAtPlxuICAgIHN1cGVyIGFuaW1hdGVcbiAgICAjIERyYXcgY2hpbGQgbGluZSBpZiBpcyBjaGlsZHJlblxuICAgIEBfZHJhd0NoaWxkTGluZSBhbmltYXRlIGlmIEBvcHRpb25zLnRyZWVEcmF3Q2hpbGRMaW5lXG4gICAgIyBEcmF3IHBhcmVudCBsaW5lIGlmIGhhcyBjaGlsZHJlblxuICAgIEBfZHJhd1BhcmVudExpbmUgYW5pbWF0ZSBpZiBAX3RyZWVPd25DaGlsZHJlbkNvbXBvbmVudFxuICAgICMgRHJhdyB1bmJpbmRlZCBsaW5lIGlmIGhhcyB1bmJpbmRlZFxuICAgIEBfZHJhd1VuYmluZGVkTGluZSBhbmltYXRlIGlmIEBfdHJlZVVuYmluZGVkQ2hpbGRyZW5Db21wb25lbnRcblxuICBfZHJhd1VuYmluZGVkTGluZTogKGFuaW1hdGUpIC0+XG4gICAgZCA9IEBvcHRpb25zLnRyZWVEZXB0aFNoaWZ0IC0gQG9wdGlvbnMudHJlZVBhcmVudExpbmVNYXJnaW5cbiAgICBoID0gQF90cmVlVW5iaW5kZWRDaGlsZHJlbkNvbXBvbmVudC5nZXRIZWlnaHQoKVxuXG4gICAgcG9pbnRzID0gW1stZCwgMF0sIFstZCwgaF1dXG4gICAgaWYgbm90IEBfdW5iaW5kZWRMaW5lXG4gICAgICBAX3VuYmluZGVkTGluZSA9IEBfdHJlZVVuYmluZGVkQ2hpbGRyZW5Db21wb25lbnQuX2VsLnBvbHlsaW5lKHBvaW50cykuc3Ryb2tlKEBvcHRpb25zLnRyZWVVbmJpbmRlZExpbmVTdHJva2UpXG4gICAgZWxzZVxuICAgICAgQF9hbmltYXRlKEBfdW5iaW5kZWRMaW5lLCBhbmltYXRlKS5wbG90KHBvaW50cylcblxuICBfZHJhd0NoaWxkTGluZTogKGFuaW1hdGUpIC0+XG4gICAgaCA9IEBfaGVhZGVyQ29tcG9uZW50LmdldEhlaWdodCgpIC8gMlxuICAgIGQgPSBAb3B0aW9ucy50cmVlRGVwdGhTaGlmdCAtIEBvcHRpb25zLnRyZWVQYXJlbnRMaW5lTWFyZ2luXG4gICAgcG9pbnRzID0gW1swLCBoXSwgWy1kLCBoXV1cbiAgICBpZiBub3QgQF9jaGlsZExpbmVcbiAgICAgIEBfY2hpbGRMaW5lID0gQF9oZWFkZXJDb21wb25lbnQuX2VsLnBvbHlsaW5lKHBvaW50cykuc3Ryb2tlKEBvcHRpb25zLnRyZWVMaW5lU3Ryb2tlKVxuICAgIGVsc2VcbiAgICAgIEBfYW5pbWF0ZShAX2NoaWxkTGluZSwgYW5pbWF0ZSkucGxvdChwb2ludHMpXG4gICAgXG4gIF9kcmF3UGFyZW50TGluZTogKGFuaW1hdGUpIC0+XG4gICAgIyBDYWxjdWxhdGUgcGFyZW50IGxpbmUgaGVpZ2h0XG4gICAgaCA9IDBcbiAgICBpZiBAX2NoaWxkVHJlZXMubGVuZ3RoID4gMVxuICAgICAgZm9yIGNoaWxkVHJlZSBpbiBAX2NoaWxkVHJlZXNbMC4uQF9jaGlsZFRyZWVzLmxlbmd0aCAtIDJdXG4gICAgICAgIGggKz0gY2hpbGRUcmVlLmdldEhlaWdodCgpICsgQG9wdGlvbnMudHJlZUZsYXRNYXJnaW5cblxuICAgICMgVE9ETyBSZWZhY3RvciBsaW5lIGNvbnRpbnVhdGlvblxuICAgIGlmIEBfcm9vdExpbmVUb0VuZCBhbmQgQGRlcHRoIGlzIDBcbiAgICAgIGggKz0gQF9jaGlsZFRyZWVzW0BfY2hpbGRUcmVlcy5sZW5ndGggLSAxXS5nZXRIZWlnaHQoKVxuICAgIGVsc2VcbiAgICAgIGggKz0gQF9jaGlsZFRyZWVzW0BfY2hpbGRUcmVlcy5sZW5ndGggLSAxXS5faGVhZGVyQ29tcG9uZW50LmdldEhlaWdodCgpIC8gMlxuXG4gICAgZCA9IEBvcHRpb25zLnRyZWVEZXB0aFNoaWZ0IC0gQG9wdGlvbnMudHJlZVBhcmVudExpbmVNYXJnaW5cblxuICAgIHBvaW50cyA9IFtbLWQsIC1Ab3B0aW9ucy5ncm91cENoaWxkTWFyZ2luXSwgWy1kLCBoXV1cbiAgICBpZiBub3QgQF9wYXJlbnRMaW5lXG4gICAgICBAX3BhcmVudExpbmUgPSBAX3RyZWVPd25DaGlsZHJlbkNvbXBvbmVudC5fZWwucG9seWxpbmUocG9pbnRzKS5zdHJva2UoQG9wdGlvbnMudHJlZUxpbmVTdHJva2UpXG4gICAgZWxzZVxuICAgICAgQF9hbmltYXRlKEBfcGFyZW50TGluZSwgYW5pbWF0ZSkucGxvdChwb2ludHMpXG5cbiAgIyBFdmVudHNcbiAgb25Db2xsYXBzZWQ6IChjYikgLT5cbiAgICBAX19jb2xsYXBzZWRDYWxsYmFja3MucHVzaCBjYlxuXG4gIF9maXJlQ29sbGFwc2VkOiAoYXJncy4uLikgLT5cbiAgICBjYiBALCBAY29sbGFwc2VkIGZvciBjYiBpbiBAX19jb2xsYXBzZWRDYWxsYmFja3NcblxuY2xhc3MgU3RhY2tUcmVlSGVhZGVyUHJvdmlkZXJcbiAgY29uc3RydWN0b3I6IChAdHJlZSkgLT5cblxuICBjcmVhdGVIZWFkZXI6IC0+XG4gICAgaWYgQHRyZWUuZGF0YUFjY2Vzc29ycy5pc0RlcCBAdHJlZS5kYXRhXG4gICAgICBuZXcgU3RhY2tIdG1sRGVwRWxlbWVudCBAdHJlZS5kYXRhQWNjZXNzb3JzLmdldENvbnRlbnQoQHRyZWUuZGF0YSksIEB0cmVlLmRhdGFBY2Nlc3NvcnMuZ2V0RGVwQ29udGVudChAdHJlZS5kYXRhKSxcbiAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IEB0cmVlLm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb25cbiAgICAgICAgZGVwTWFpbldpZHRoOiBAdHJlZS5vcHRpb25zLnRyZWVXaWR0aFxuICAgICAgICBkZXBXaWR0aDogQHRyZWUub3B0aW9ucy50cmVlV2lkdGggLSBAdHJlZS5vcHRpb25zLnRyZWVEZXB0aFNoaWZ0ICogQHRyZWUuZGVwdGhcbiAgICAgICAgZGVwSWdub3JlRGVwSGVpZ2h0OiBub3QgQHRyZWUub3B0aW9ucy50cmVlRGVwSGFzU3Vycm91bmRpbmdEZXBzXG4gICAgICAgIGRlcERhc2hhcnJheTogQHRyZWUub3B0aW9ucy50cmVlRGVwRGFzaGFycmF5XG4gICAgICAgIGRlcExpbmVTdHJva2U6IEB0cmVlLm9wdGlvbnMudHJlZUxpbmVTdHJva2VcbiAgICBlbHNlXG4gICAgICBpZiBAdHJlZS5jb2xsYXBzaWJsZSgpXG4gICAgICAgIGhlYWRlciA9IG5ldyBTdGFja0h0bWxFbGVtZW50V2l0aENvbGxhcHNlciBAdHJlZS5kYXRhQWNjZXNzb3JzLmdldENvbnRlbnQoQHRyZWUuZGF0YSksIEB0cmVlLFxuICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiBAdHJlZS5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uXG4gICAgICAgICAgaHRtbFdpZHRoOiBAdHJlZS5vcHRpb25zLnRyZWVXaWR0aCAtIEB0cmVlLm9wdGlvbnMudHJlZURlcHRoU2hpZnQgKiBAdHJlZS5kZXB0aFxuICAgICAgICAgIGh0bWxSZWN0RmlsbDogQHRyZWUub3B0aW9ucy50cmVlUmVjdEZpbGxcbiAgICAgICAgICBodG1sUmVjdFN0cm9rZUNvbG9yOiBAdHJlZS5vcHRpb25zLnRyZWVSZWN0U3Ryb2tlQ29sb3JcbiAgICAgICAgICBodG1sUmVjdFN0cm9rZURhc2hhcnJheTogQHRyZWUub3B0aW9ucy50cmVlUmVjdFN0cm9rZURhc2hhcnJheVxuICAgICAgZWxzZVxuICAgICAgICBoZWFkZXIgPSBuZXcgU3RhY2tIdG1sRWxlbWVudCBAdHJlZS5kYXRhQWNjZXNzb3JzLmdldENvbnRlbnQoQHRyZWUuZGF0YSksXG4gICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IEB0cmVlLm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb25cbiAgICAgICAgICBodG1sV2lkdGg6IEB0cmVlLm9wdGlvbnMudHJlZVdpZHRoIC0gQHRyZWUub3B0aW9ucy50cmVlRGVwdGhTaGlmdCAqIEB0cmVlLmRlcHRoXG4gICAgICAgICAgaHRtbFJlY3RGaWxsOiBAdHJlZS5vcHRpb25zLnRyZWVSZWN0RmlsbFxuICAgICAgICAgIGh0bWxSZWN0U3Ryb2tlQ29sb3I6IEB0cmVlLm9wdGlvbnMudHJlZVJlY3RTdHJva2VDb2xvclxuICAgICAgICAgIGh0bWxSZWN0U3Ryb2tlRGFzaGFycmF5OiBAdHJlZS5vcHRpb25zLnRyZWVSZWN0U3Ryb2tlRGFzaGFycmF5XG4gICAgICBpZiBAdHJlZS5kZXB0aCBpcyAwIGFuZCAoYWRkaXRpb25hbENvbnRlbnQgPSBAdHJlZS5kYXRhQWNjZXNzb3JzLmdldFJvb3RIZWFkZXJBZGRpdGlvbmFsQ29udGVudChAdHJlZS5kYXRhKSlcbiAgICAgICAgaCA9IG5ldyBTdGFja1ZlcnRpY2FsQ29udGFpbmVyXG4gICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IEB0cmVlLm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb25cbiAgICAgICAgICB2ZXJ0TWFyZ2luOiBAdHJlZS5vcHRpb25zLnRyZWVXaWR0aFxuICAgICAgICAjIG5ldyBTdGFja0h0bWxFbGVtZW50ICc8aDE+W3Jvb3RdPC9oMT4nICsgQHRyZWUuZGF0YUFjY2Vzc29ycy5nZXRDb250ZW50KEB0cmVlLmRhdGEpLFxuICAgICAgICAjICAgYW5pbWF0aW9uRHVyYXRpb246IEB0cmVlLm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb25cbiAgICAgICAgIyAgIGh0bWxXaWR0aDogQHRyZWUub3B0aW9ucy50cmVlV2lkdGggLSBAdHJlZS5vcHRpb25zLnRyZWVEZXB0aFNoaWZ0ICogQHRyZWUuZGVwdGhcbiAgICAgICAgaGVhZGVyQWRkaXRpb24gPSBuZXcgU3RhY2tIdG1sRWxlbWVudCBhZGRpdGlvbmFsQ29udGVudCxcbiAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogQHRyZWUub3B0aW9ucy5hbmltYXRpb25EdXJhdGlvblxuICAgICAgICAgIGh0bWxXaWR0aDogQHRyZWUub3B0aW9ucy50cmVlV2lkdGhcbiAgICAgICAgICBodG1sUmVjdDogZmFsc2VcbiAgICAgICAgICBpZ25vcmVIZWlnaHQ6IHRydWVcblxuICAgICAgICAjIGRlYnVnXG4gICAgICAgIGhlYWRlci5wcmVwZW5kZWQucHVzaCAnPGRpdj4xPC9kaXY+J1xuICAgICAgICBoZWFkZXIucHJlcGVuZGVkLnB1c2ggJzxkaXY+MjwvZGl2PidcbiAgICAgICAgaGVhZGVyLmFwcGVuZGVkLnB1c2ggJzxkaXY+MzwvZGl2PidcbiAgICAgICAgaGVhZGVyLmFwcGVuZGVkLnB1c2ggJzxkaXY+NDwvZGl2PidcbiAgICAgICAgZiA9IC0+XG4gICAgICAgICAgcmFuZGggPSAtPiBcIjxkaXYgc3R5bGU9J2hlaWdodDogI3tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA1KSAqIDUwfXB4Jz5BPC9kaXY+XCJcbiAgICAgICAgICBoZWFkZXIudXBkYXRlQ29udGVudCByYW5kaCgpXG4gICAgICAgICAgaGVhZGVyQWRkaXRpb24udXBkYXRlQ29udGVudCByYW5kaCgpXG4gICAgICAgIGhlYWRlci5vbiAnY2xpY2snLCBmXG4gICAgICAgIGhlYWRlckFkZGl0aW9uLm9uICdjbGljaycsIGZcblxuICAgICAgICBoLmFkZENoaWxkIGhlYWRlclxuICAgICAgICBoLmFkZENoaWxkIGhlYWRlckFkZGl0aW9uXG4gICAgICAgIGhcbiAgICAgIGVsc2VcbiAgICAgICAgaGVhZGVyXG4iXX0=