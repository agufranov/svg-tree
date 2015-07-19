var StackHtmlElementWithCollapser,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StackHtmlElementWithCollapser = (function(superClass) {
  extend(StackHtmlElementWithCollapser, superClass);

  function StackHtmlElementWithCollapser(content, tree, options) {
    this.tree = tree;
    StackHtmlElementWithCollapser.__super__.constructor.call(this, content, options);
    this.appended.push($('<div>').addClass(this.options.collapserWrapperClass));
    this.on('click', '.tree-header-collapser', (function(_this) {
      return function(event) {
        event.preventDefault();
        return _this.tree.toggleCollapse();
      };
    })(this));
    this.tree.onCollapsed((function(_this) {
      return function() {
        return _this._updateCollapser();
      };
    })(this));
  }

  StackHtmlElementWithCollapser.prototype._renderContents = function() {
    StackHtmlElementWithCollapser.__super__._renderContents.call(this);
    return this._updateCollapser();
  };

  StackHtmlElementWithCollapser.prototype.getDefaultOptions = function() {
    return _.merge(StackHtmlElementWithCollapser.__super__.getDefaultOptions.call(this), {
      collapsedTemplate: '<i class="fa fa-angle-double-down">',
      expandedTemplate: '<i class="fa fa-angle-double-up">',
      collapserWrapperClass: 'tree-header-collapser'
    });
  };

  StackHtmlElementWithCollapser.prototype._getCollapserTemplate = function() {
    if (this.tree.collapsed) {
      return this.options.collapsedTemplate;
    } else {
      return this.options.expandedTemplate;
    }
  };

  StackHtmlElementWithCollapser.prototype._updateCollapser = function() {
    return $(this._wrapper).find("." + this.options.collapserWrapperClass).html(this._getCollapserTemplate());
  };

  return StackHtmlElementWithCollapser;

})(StackHtmlElement);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvdHJlZS9zdGFja0h0bWxFbGVtZW50V2l0aENvbGxhcHNlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSw2QkFBQTtFQUFBOzs7QUFBTTs7O0VBQ1MsdUNBQUMsT0FBRCxFQUFVLElBQVYsRUFBaUIsT0FBakI7SUFBVSxJQUFDLENBQUEsT0FBRDtJQUNyQiwrREFBTSxPQUFOLEVBQWUsT0FBZjtJQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLENBQUEsQ0FBRSxPQUFGLENBQVUsQ0FBQyxRQUFYLENBQW9CLElBQUMsQ0FBQSxPQUFPLENBQUMscUJBQTdCLENBQWY7SUFFQSxJQUFDLENBQUEsRUFBRCxDQUFJLE9BQUosRUFBYSx3QkFBYixFQUF1QyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsS0FBRDtRQUNyQyxLQUFLLENBQUMsY0FBTixDQUFBO2VBQ0EsS0FBQyxDQUFBLElBQUksQ0FBQyxjQUFOLENBQUE7TUFGcUM7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXZDO0lBSUEsSUFBQyxDQUFBLElBQUksQ0FBQyxXQUFOLENBQWtCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUNoQixLQUFDLENBQUEsZ0JBQUQsQ0FBQTtNQURnQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEI7RUFSVzs7MENBV2IsZUFBQSxHQUFpQixTQUFBO0lBQ2YsaUVBQUE7V0FDQSxJQUFDLENBQUEsZ0JBQUQsQ0FBQTtFQUZlOzswQ0FJakIsaUJBQUEsR0FBbUIsU0FBQTtXQUFHLENBQUMsQ0FBQyxLQUFGLENBQVEsbUVBQUEsQ0FBUixFQUFpQjtNQUFBLGlCQUFBLEVBQW1CLHFDQUFuQjtNQUEwRCxnQkFBQSxFQUFrQixtQ0FBNUU7TUFBaUgscUJBQUEsRUFBdUIsdUJBQXhJO0tBQWpCO0VBQUg7OzBDQUVuQixxQkFBQSxHQUF1QixTQUFBO0lBQ3JCLElBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxTQUFUO2FBQXdCLElBQUMsQ0FBQSxPQUFPLENBQUMsa0JBQWpDO0tBQUEsTUFBQTthQUF3RCxJQUFDLENBQUEsT0FBTyxDQUFDLGlCQUFqRTs7RUFEcUI7OzBDQUd2QixnQkFBQSxHQUFrQixTQUFBO1dBQ2hCLENBQUEsQ0FBRSxJQUFDLENBQUEsUUFBSCxDQUFZLENBQUMsSUFBYixDQUFrQixHQUFBLEdBQUksSUFBQyxDQUFBLE9BQU8sQ0FBQyxxQkFBL0IsQ0FBdUQsQ0FBQyxJQUF4RCxDQUE2RCxJQUFDLENBQUEscUJBQUQsQ0FBQSxDQUE3RDtFQURnQjs7OztHQXJCd0IiLCJmaWxlIjoiY2xhc3Nlcy90cmVlL3N0YWNrSHRtbEVsZW1lbnRXaXRoQ29sbGFwc2VyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3RhY2tIdG1sRWxlbWVudFdpdGhDb2xsYXBzZXIgZXh0ZW5kcyBTdGFja0h0bWxFbGVtZW50XG4gIGNvbnN0cnVjdG9yOiAoY29udGVudCwgQHRyZWUsIG9wdGlvbnMpIC0+XG4gICAgc3VwZXIgY29udGVudCwgb3B0aW9uc1xuICAgIEBhcHBlbmRlZC5wdXNoICQoJzxkaXY+JykuYWRkQ2xhc3MoQG9wdGlvbnMuY29sbGFwc2VyV3JhcHBlckNsYXNzKVxuXG4gICAgQG9uICdjbGljaycsICcudHJlZS1oZWFkZXItY29sbGFwc2VyJywgKGV2ZW50KSA9PlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgQHRyZWUudG9nZ2xlQ29sbGFwc2UoKVxuXG4gICAgQHRyZWUub25Db2xsYXBzZWQgPT5cbiAgICAgIEBfdXBkYXRlQ29sbGFwc2VyKClcblxuICBfcmVuZGVyQ29udGVudHM6IC0+XG4gICAgc3VwZXIoKVxuICAgIEBfdXBkYXRlQ29sbGFwc2VyKClcblxuICBnZXREZWZhdWx0T3B0aW9uczogLT4gXy5tZXJnZSBzdXBlcigpLCBjb2xsYXBzZWRUZW1wbGF0ZTogJzxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtZG91YmxlLWRvd25cIj4nLCBleHBhbmRlZFRlbXBsYXRlOiAnPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1kb3VibGUtdXBcIj4nLCBjb2xsYXBzZXJXcmFwcGVyQ2xhc3M6ICd0cmVlLWhlYWRlci1jb2xsYXBzZXInXG5cbiAgX2dldENvbGxhcHNlclRlbXBsYXRlOiAtPlxuICAgIGlmIEB0cmVlLmNvbGxhcHNlZCB0aGVuIEBvcHRpb25zLmNvbGxhcHNlZFRlbXBsYXRlIGVsc2UgQG9wdGlvbnMuZXhwYW5kZWRUZW1wbGF0ZVxuXG4gIF91cGRhdGVDb2xsYXBzZXI6IC0+XG4gICAgJChAX3dyYXBwZXIpLmZpbmQoXCIuI3tAb3B0aW9ucy5jb2xsYXBzZXJXcmFwcGVyQ2xhc3N9XCIpLmh0bWwgQF9nZXRDb2xsYXBzZXJUZW1wbGF0ZSgpXG4iXX0=