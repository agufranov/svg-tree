var StackContainer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StackContainer = (function(superClass) {
  extend(StackContainer, superClass);

  function StackContainer(options) {
    StackContainer.__super__.constructor.call(this, options);
    this._children = [];
    this._updating = false;
  }

  StackContainer.prototype.getDefaultOptions = function() {
    return _.merge(StackContainer.__super__.getDefaultOptions.call(this), {
      groupChildMargin: 5
    });
  };

  StackContainer.prototype.getHeight = function() {
    return this.height;
  };

  StackContainer.prototype._arrange = function(animate) {
    var child, heightAcc, i, index, len, ref;
    heightAcc = 0;
    if (this._children.length === 0) {
      this.height = heightAcc;
      return;
    }
    ref = this._children;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      child = ref[index];
      if (!child.ignoreHeight()) {
        child.moveTo(null, heightAcc, animate);
        heightAcc += child.getHeight();
        heightAcc += this.options.groupChildMargin;
      }
    }
    heightAcc -= this.options.groupChildMargin;
    this.height = heightAcc;
    return this._fireHeightChanged();
  };

  return StackContainer;

})(StackAbstractContainer);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvc3RhY2tDb250YWluZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsY0FBQTtFQUFBOzs7QUFBTTs7O0VBQ1Msd0JBQUMsT0FBRDtJQUNYLGdEQUFNLE9BQU47SUFDQSxJQUFDLENBQUEsU0FBRCxHQUFhO0lBQ2IsSUFBQyxDQUFBLFNBQUQsR0FBYTtFQUhGOzsyQkFLYixpQkFBQSxHQUFtQixTQUFBO1dBQUcsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxvREFBQSxDQUFSLEVBQWlCO01BQUEsZ0JBQUEsRUFBa0IsQ0FBbEI7S0FBakI7RUFBSDs7MkJBRW5CLFNBQUEsR0FBVyxTQUFBO1dBQUcsSUFBQyxDQUFBO0VBQUo7OzJCQUVYLFFBQUEsR0FBVSxTQUFDLE9BQUQ7QUFDUixRQUFBO0lBQUEsU0FBQSxHQUFZO0lBQ1osSUFBRyxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQVgsS0FBcUIsQ0FBeEI7TUFDRSxJQUFDLENBQUEsTUFBRCxHQUFVO0FBQ1YsYUFGRjs7QUFHQTtBQUFBLFNBQUEscURBQUE7O01BQ0UsSUFBQSxDQUFPLEtBQUssQ0FBQyxZQUFOLENBQUEsQ0FBUDtRQUNFLEtBQUssQ0FBQyxNQUFOLENBQWEsSUFBYixFQUFtQixTQUFuQixFQUE4QixPQUE5QjtRQUNBLFNBQUEsSUFBYSxLQUFLLENBQUMsU0FBTixDQUFBO1FBQ2IsU0FBQSxJQUFhLElBQUMsQ0FBQSxPQUFPLENBQUMsaUJBSHhCOztBQURGO0lBS0EsU0FBQSxJQUFhLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDdEIsSUFBQyxDQUFBLE1BQUQsR0FBVTtXQUNWLElBQUMsQ0FBQSxrQkFBRCxDQUFBO0VBWlE7Ozs7R0FWaUIiLCJmaWxlIjoiY2xhc3Nlcy9zdGFja0NvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFN0YWNrQ29udGFpbmVyIGV4dGVuZHMgU3RhY2tBYnN0cmFjdENvbnRhaW5lclxuICBjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG4gICAgc3VwZXIgb3B0aW9uc1xuICAgIEBfY2hpbGRyZW4gPSBbXVxuICAgIEBfdXBkYXRpbmcgPSBmYWxzZVxuXG4gIGdldERlZmF1bHRPcHRpb25zOiAtPiBfLm1lcmdlIHN1cGVyKCksIGdyb3VwQ2hpbGRNYXJnaW46IDVcblxuICBnZXRIZWlnaHQ6IC0+IEBoZWlnaHRcblxuICBfYXJyYW5nZTogKGFuaW1hdGUpIC0+XG4gICAgaGVpZ2h0QWNjID0gMFxuICAgIGlmIEBfY2hpbGRyZW4ubGVuZ3RoIGlzIDBcbiAgICAgIEBoZWlnaHQgPSBoZWlnaHRBY2NcbiAgICAgIHJldHVyblxuICAgIGZvciBjaGlsZCwgaW5kZXggaW4gQF9jaGlsZHJlblxuICAgICAgdW5sZXNzIGNoaWxkLmlnbm9yZUhlaWdodCgpXG4gICAgICAgIGNoaWxkLm1vdmVUbyBudWxsLCBoZWlnaHRBY2MsIGFuaW1hdGVcbiAgICAgICAgaGVpZ2h0QWNjICs9IGNoaWxkLmdldEhlaWdodCgpXG4gICAgICAgIGhlaWdodEFjYyArPSBAb3B0aW9ucy5ncm91cENoaWxkTWFyZ2luXG4gICAgaGVpZ2h0QWNjIC09IEBvcHRpb25zLmdyb3VwQ2hpbGRNYXJnaW5cbiAgICBAaGVpZ2h0ID0gaGVpZ2h0QWNjXG4gICAgQF9maXJlSGVpZ2h0Q2hhbmdlZCgpXG4iXX0=