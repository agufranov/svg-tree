var SvgStackElement,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SvgStackElement = (function(superClass) {
  extend(SvgStackElement, superClass);

  function SvgStackElement(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, this.getDefaultOptions());
  }

  SvgStackElement.prototype.getDefaultOptions = function() {
    return {};
  };

  SvgStackElement.prototype.moveTo = function(x, y) {
    this._el.move(x, y);
    return this;
  };

  SvgStackElement.prototype.moveBy = function(x, y) {
    this._el.dmove(x, y);
    return this;
  };

  SvgStackElement.prototype.getHeight = function() {
    return this._el.node.getBBox().height;
  };

  SvgStackElement.prototype.renderTo = function(_parentEl) {
    SvgStackElement.__super__.renderTo.call(this, _parentEl);
    this._el = this._elFn(this._parentEl);
    return this;
  };

  SvgStackElement.prototype._elFn = function(parentEl) {
    return parentEl.group();
  };

  return SvgStackElement;

})(AbstractStackElement);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvc3ZnU3RhY2tFbGVtZW50LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGVBQUE7RUFBQTs7O0FBQU07OztFQUNTLHlCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBVztJQUN2QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQXFCLElBQUMsQ0FBQSxpQkFBRCxDQUFBLENBQXJCO0VBRFc7OzRCQUdiLGlCQUFBLEdBQW1CLFNBQUE7V0FBRztFQUFIOzs0QkFFbkIsTUFBQSxHQUFRLFNBQUMsQ0FBRCxFQUFJLENBQUo7SUFDTixJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxDQUFWLEVBQWEsQ0FBYjtXQUNBO0VBRk07OzRCQUlSLE1BQUEsR0FBUSxTQUFDLENBQUQsRUFBSSxDQUFKO0lBQ04sSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQWQ7V0FDQTtFQUZNOzs0QkFJUixTQUFBLEdBQVcsU0FBQTtXQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBQSxDQUFtQixDQUFDO0VBQXZCOzs0QkFFWCxRQUFBLEdBQVUsU0FBQyxTQUFEO0lBQ1IsOENBQU0sU0FBTjtJQUNBLElBQUMsQ0FBQSxHQUFELEdBQU8sSUFBQyxDQUFBLEtBQUQsQ0FBTyxJQUFDLENBQUEsU0FBUjtXQUNQO0VBSFE7OzRCQUtWLEtBQUEsR0FBTyxTQUFDLFFBQUQ7V0FBYyxRQUFRLENBQUMsS0FBVCxDQUFBO0VBQWQ7Ozs7R0FyQnFCIiwiZmlsZSI6ImNsYXNzZXMvc3ZnU3RhY2tFbGVtZW50LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3ZnU3RhY2tFbGVtZW50IGV4dGVuZHMgQWJzdHJhY3RTdGFja0VsZW1lbnRcbiAgY29uc3RydWN0b3I6IChAb3B0aW9ucyA9IHt9KSAtPlxuICAgIF8uZGVmYXVsdHMgQG9wdGlvbnMsIEBnZXREZWZhdWx0T3B0aW9ucygpXG5cbiAgZ2V0RGVmYXVsdE9wdGlvbnM6IC0+IHt9XG5cbiAgbW92ZVRvOiAoeCwgeSkgLT5cbiAgICBAX2VsLm1vdmUgeCwgeVxuICAgIEBcblxuICBtb3ZlQnk6ICh4LCB5KSAtPlxuICAgIEBfZWwuZG1vdmUgeCwgeVxuICAgIEBcblxuICBnZXRIZWlnaHQ6IC0+IEBfZWwubm9kZS5nZXRCQm94KCkuaGVpZ2h0XG5cbiAgcmVuZGVyVG86IChfcGFyZW50RWwpIC0+XG4gICAgc3VwZXIgX3BhcmVudEVsXG4gICAgQF9lbCA9IEBfZWxGbiBAX3BhcmVudEVsXG4gICAgQFxuXG4gIF9lbEZuOiAocGFyZW50RWwpIC0+IHBhcmVudEVsLmdyb3VwKClcbiJdfQ==