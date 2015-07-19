var StackVerticalContainer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StackVerticalContainer = (function(superClass) {
  extend(StackVerticalContainer, superClass);

  function StackVerticalContainer(options) {
    StackVerticalContainer.__super__.constructor.call(this, options);
  }

  StackVerticalContainer.prototype.getDefaultOptions = function() {
    return _.merge(StackVerticalContainer.__super__.getDefaultOptions.call(this), {
      vertMargin: 200
    });
  };

  StackVerticalContainer.prototype.getHeight = function() {
    return this.height;
  };

  StackVerticalContainer.prototype._arrange = function(animate) {
    var child, childHeight, i, len, maxChildHeight, ref, results, w;
    maxChildHeight = 0;
    if (this._children.length === 0) {
      this.height = 0;
      return;
    }
    this.height = _.max(_.filter(this._children, function(child) {
      return !child.ignoreHeight();
    }), function(child) {
      return child.getHeight();
    }).getHeight();
    this._fireHeightChanged();
    w = 0;
    ref = this._children;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      childHeight = (this.height - child.getHeight()) / 2;
      child.moveTo(w, childHeight, animate);
      results.push(w += _.isArray(this.options.vertMargin) ? this.options.vertMargin.unshift() : this.options.vertMargin);
    }
    return results;
  };

  return StackVerticalContainer;

})(StackAbstractContainer);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvc3RhY2tIb3Jpem9udGFsQ29udGFpbmVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLHNCQUFBO0VBQUE7OztBQUFNOzs7RUFDUyxnQ0FBQyxPQUFEO0lBQ1gsd0RBQU0sT0FBTjtFQURXOzttQ0FHYixpQkFBQSxHQUFtQixTQUFBO1dBQUcsQ0FBQyxDQUFDLEtBQUYsQ0FBUSw0REFBQSxDQUFSLEVBQWlCO01BQUEsVUFBQSxFQUFZLEdBQVo7S0FBakI7RUFBSDs7bUNBRW5CLFNBQUEsR0FBVyxTQUFBO1dBQUcsSUFBQyxDQUFBO0VBQUo7O21DQUVYLFFBQUEsR0FBVSxTQUFDLE9BQUQ7QUFDUixRQUFBO0lBQUEsY0FBQSxHQUFpQjtJQUNqQixJQUFHLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBWCxLQUFxQixDQUF4QjtNQUNFLElBQUMsQ0FBQSxNQUFELEdBQVU7QUFDVixhQUZGOztJQUdBLElBQUMsQ0FBQSxNQUFELEdBQVUsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxDQUFDLENBQUMsTUFBRixDQUFTLElBQUMsQ0FBQSxTQUFWLEVBQXFCLFNBQUMsS0FBRDthQUFXLENBQUksS0FBSyxDQUFDLFlBQU4sQ0FBQTtJQUFmLENBQXJCLENBQU4sRUFBaUUsU0FBQyxLQUFEO2FBQVcsS0FBSyxDQUFDLFNBQU4sQ0FBQTtJQUFYLENBQWpFLENBQThGLENBQUMsU0FBL0YsQ0FBQTtJQUNWLElBQUMsQ0FBQSxrQkFBRCxDQUFBO0lBQ0EsQ0FBQSxHQUFJO0FBQ0o7QUFBQTtTQUFBLHFDQUFBOztNQUNFLFdBQUEsR0FBYyxDQUFDLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FBSyxDQUFDLFNBQU4sQ0FBQSxDQUFYLENBQUEsR0FBZ0M7TUFDOUMsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFiLEVBQWdCLFdBQWhCLEVBQTZCLE9BQTdCO21CQUNBLENBQUEsSUFBUSxDQUFDLENBQUMsT0FBRixDQUFVLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBbkIsQ0FBSCxHQUF1QyxJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFwQixDQUFBLENBQXZDLEdBQTBFLElBQUMsQ0FBQSxPQUFPLENBQUM7QUFIMUY7O0VBUlE7Ozs7R0FSeUIiLCJmaWxlIjoiY2xhc3Nlcy9zdGFja0hvcml6b250YWxDb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTdGFja1ZlcnRpY2FsQ29udGFpbmVyIGV4dGVuZHMgU3RhY2tBYnN0cmFjdENvbnRhaW5lclxuICBjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG4gICAgc3VwZXIgb3B0aW9uc1xuXG4gIGdldERlZmF1bHRPcHRpb25zOiAtPiBfLm1lcmdlIHN1cGVyKCksIHZlcnRNYXJnaW46IDIwMFxuXG4gIGdldEhlaWdodDogLT4gQGhlaWdodFxuXG4gIF9hcnJhbmdlOiAoYW5pbWF0ZSkgLT5cbiAgICBtYXhDaGlsZEhlaWdodCA9IDBcbiAgICBpZiBAX2NoaWxkcmVuLmxlbmd0aCBpcyAwXG4gICAgICBAaGVpZ2h0ID0gMFxuICAgICAgcmV0dXJuXG4gICAgQGhlaWdodCA9IF8ubWF4KF8uZmlsdGVyKEBfY2hpbGRyZW4sIChjaGlsZCkgLT4gbm90IGNoaWxkLmlnbm9yZUhlaWdodCgpKSwgKGNoaWxkKSAtPiBjaGlsZC5nZXRIZWlnaHQoKSkuZ2V0SGVpZ2h0KClcbiAgICBAX2ZpcmVIZWlnaHRDaGFuZ2VkKCkgIyBjaGVjayB3aXRoIGNvbW1lbnRcbiAgICB3ID0gMFxuICAgIGZvciBjaGlsZCBpbiBAX2NoaWxkcmVuXG4gICAgICBjaGlsZEhlaWdodCA9IChAaGVpZ2h0IC0gY2hpbGQuZ2V0SGVpZ2h0KCkpIC8gMlxuICAgICAgY2hpbGQubW92ZVRvIHcsIGNoaWxkSGVpZ2h0LCBhbmltYXRlXG4gICAgICB3ICs9IGlmIF8uaXNBcnJheShAb3B0aW9ucy52ZXJ0TWFyZ2luKSB0aGVuIEBvcHRpb25zLnZlcnRNYXJnaW4udW5zaGlmdCgpIGVsc2UgQG9wdGlvbnMudmVydE1hcmdpblxuIl19