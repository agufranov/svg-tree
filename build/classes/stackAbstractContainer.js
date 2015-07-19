var StackAbstractContainer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StackAbstractContainer = (function(superClass) {
  extend(StackAbstractContainer, superClass);

  function StackAbstractContainer(options) {
    StackAbstractContainer.__super__.constructor.call(this, options);
    this._children = [];
    this._updating = false;
  }

  StackAbstractContainer.prototype.renderTo = function(_parentEl) {
    var child, i, len, ref;
    StackAbstractContainer.__super__.renderTo.call(this, _parentEl);
    this.beginUpdate();
    ref = this._children;
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      child.renderTo(this._el);
    }
    return this.endUpdate();
  };

  StackAbstractContainer.prototype.addChild = function(child) {
    this._children.push(child);
    child.onHeightChanged((function(_this) {
      return function() {
        return _this._childHeightChanged(true);
      };
    })(this));
    return child;
  };

  StackAbstractContainer.prototype._arrange = function(animate) {
    throw new Error('Not Implemented');
  };

  StackAbstractContainer.prototype._childHeightChanged = function(animate) {
    if (!this._updating) {
      return this._arrange(animate);
    }
  };

  StackAbstractContainer.prototype.beginUpdate = function() {
    return this._updating = true;
  };

  StackAbstractContainer.prototype.endUpdate = function() {
    this._updating = false;
    return this._childHeightChanged(false);
  };

  return StackAbstractContainer;

})(StackElement);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvc3RhY2tBYnN0cmFjdENvbnRhaW5lci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxzQkFBQTtFQUFBOzs7QUFBTTs7O0VBQ1MsZ0NBQUMsT0FBRDtJQUNYLHdEQUFNLE9BQU47SUFDQSxJQUFDLENBQUEsU0FBRCxHQUFhO0lBQ2IsSUFBQyxDQUFBLFNBQUQsR0FBYTtFQUhGOzttQ0FLYixRQUFBLEdBQVUsU0FBQyxTQUFEO0FBQ1IsUUFBQTtJQUFBLHFEQUFNLFNBQU47SUFDQSxJQUFDLENBQUEsV0FBRCxDQUFBO0FBQ0E7QUFBQSxTQUFBLHFDQUFBOztNQUNFLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBQyxDQUFBLEdBQWhCO0FBREY7V0FFQSxJQUFDLENBQUEsU0FBRCxDQUFBO0VBTFE7O21DQU9WLFFBQUEsR0FBVSxTQUFDLEtBQUQ7SUFDUixJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBZ0IsS0FBaEI7SUFDQSxLQUFLLENBQUMsZUFBTixDQUFzQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBRyxLQUFDLENBQUEsbUJBQUQsQ0FBcUIsSUFBckI7TUFBSDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdEI7V0FDQTtFQUhROzttQ0FLVixRQUFBLEdBQVUsU0FBQyxPQUFEO0FBQWEsVUFBVSxJQUFBLEtBQUEsQ0FBTSxpQkFBTjtFQUF2Qjs7bUNBRVYsbUJBQUEsR0FBcUIsU0FBQyxPQUFEO0lBQ25CLElBQUEsQ0FBMEIsSUFBQyxDQUFBLFNBQTNCO2FBQUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxPQUFWLEVBQUE7O0VBRG1COzttQ0FHckIsV0FBQSxHQUFhLFNBQUE7V0FDWCxJQUFDLENBQUEsU0FBRCxHQUFhO0VBREY7O21DQUdiLFNBQUEsR0FBVyxTQUFBO0lBQ1QsSUFBQyxDQUFBLFNBQUQsR0FBYTtXQUNiLElBQUMsQ0FBQSxtQkFBRCxDQUFxQixLQUFyQjtFQUZTOzs7O0dBMUJ3QiIsImZpbGUiOiJjbGFzc2VzL3N0YWNrQWJzdHJhY3RDb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTdGFja0Fic3RyYWN0Q29udGFpbmVyIGV4dGVuZHMgU3RhY2tFbGVtZW50XG4gIGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cbiAgICBzdXBlciBvcHRpb25zXG4gICAgQF9jaGlsZHJlbiA9IFtdXG4gICAgQF91cGRhdGluZyA9IGZhbHNlXG5cbiAgcmVuZGVyVG86IChfcGFyZW50RWwpIC0+XG4gICAgc3VwZXIgX3BhcmVudEVsXG4gICAgQGJlZ2luVXBkYXRlKClcbiAgICBmb3IgY2hpbGQgaW4gQF9jaGlsZHJlblxuICAgICAgY2hpbGQucmVuZGVyVG8gQF9lbFxuICAgIEBlbmRVcGRhdGUoKVxuXG4gIGFkZENoaWxkOiAoY2hpbGQpIC0+XG4gICAgQF9jaGlsZHJlbi5wdXNoIGNoaWxkXG4gICAgY2hpbGQub25IZWlnaHRDaGFuZ2VkID0+IEBfY2hpbGRIZWlnaHRDaGFuZ2VkIHRydWVcbiAgICBjaGlsZFxuXG4gIF9hcnJhbmdlOiAoYW5pbWF0ZSkgLT4gdGhyb3cgbmV3IEVycm9yICdOb3QgSW1wbGVtZW50ZWQnXG5cbiAgX2NoaWxkSGVpZ2h0Q2hhbmdlZDogKGFuaW1hdGUpIC0+XG4gICAgQF9hcnJhbmdlKGFuaW1hdGUpIHVubGVzcyBAX3VwZGF0aW5nXG5cbiAgYmVnaW5VcGRhdGU6IC0+XG4gICAgQF91cGRhdGluZyA9IHRydWVcblxuICBlbmRVcGRhdGU6IC0+XG4gICAgQF91cGRhdGluZyA9IGZhbHNlXG4gICAgQF9jaGlsZEhlaWdodENoYW5nZWQgZmFsc2VcbiJdfQ==