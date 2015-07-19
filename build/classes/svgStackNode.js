var SvgStackNode,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SvgStackNode = (function(superClass) {
  extend(SvgStackNode, superClass);

  function SvgStackNode(options) {
    SvgStackNode.__super__.constructor.call(this, options);
    this._children = [];
  }

  SvgStackNode.prototype.getDefaultOptions = function() {
    return _.merge(SvgStackNode.__super__.getDefaultOptions.call(this), {
      groupChildMargin: 5
    });
  };

  SvgStackNode.prototype.renderTo = function(_parentEl) {
    var child, i, len, ref;
    SvgStackNode.__super__.renderTo.call(this, _parentEl);
    ref = this._children;
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      child.renderTo(this._el);
    }
    return this.arrangeChildren();
  };

  SvgStackNode.prototype.getHeight = function() {
    return this.height;
  };

  SvgStackNode.prototype.addChild = function(child) {
    this._children.push(child);
    return child;
  };

  SvgStackNode.prototype.arrangeChildren = function() {
    var child, heightAcc, i, index, len, ref;
    heightAcc = 0;
    if (!this._children.length) {
      return;
    }
    ref = this._children;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      child = ref[index];
      child.moveTo(0, heightAcc);
      heightAcc += child.getHeight();
      if (index < this._children.length - 1) {
        heightAcc += this.options.groupChildMargin;
      }
      if (_.isNaN(heightAcc)) {
        debugger;
      }
    }
    return this.height = heightAcc;
  };

  return SvgStackNode;

})(SvgStackElement);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvc3ZnU3RhY2tOb2RlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFlBQUE7RUFBQTs7O0FBQU07OztFQUNTLHNCQUFDLE9BQUQ7SUFDWCw4Q0FBTSxPQUFOO0lBQ0EsSUFBQyxDQUFBLFNBQUQsR0FBYTtFQUZGOzt5QkFJYixpQkFBQSxHQUFtQixTQUFBO1dBQUcsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxrREFBQSxDQUFSLEVBQWlCO01BQUEsZ0JBQUEsRUFBa0IsQ0FBbEI7S0FBakI7RUFBSDs7eUJBRW5CLFFBQUEsR0FBVSxTQUFDLFNBQUQ7QUFDUixRQUFBO0lBQUEsMkNBQU0sU0FBTjtBQUNBO0FBQUEsU0FBQSxxQ0FBQTs7TUFDRSxLQUFLLENBQUMsUUFBTixDQUFlLElBQUMsQ0FBQSxHQUFoQjtBQURGO1dBRUEsSUFBQyxDQUFBLGVBQUQsQ0FBQTtFQUpROzt5QkFNVixTQUFBLEdBQVcsU0FBQTtXQUFHLElBQUMsQ0FBQTtFQUFKOzt5QkFFWCxRQUFBLEdBQVUsU0FBQyxLQUFEO0lBQ1IsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLENBQWdCLEtBQWhCO1dBQ0E7RUFGUTs7eUJBSVYsZUFBQSxHQUFpQixTQUFBO0FBQ2YsUUFBQTtJQUFBLFNBQUEsR0FBWTtJQUNaLElBQUEsQ0FBYyxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQXpCO0FBQUEsYUFBQTs7QUFDQTtBQUFBLFNBQUEscURBQUE7O01BQ0UsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFiLEVBQWdCLFNBQWhCO01BQ0EsU0FBQSxJQUFhLEtBQUssQ0FBQyxTQUFOLENBQUE7TUFDYixJQUEwQyxLQUFBLEdBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLEdBQW9CLENBQXRFO1FBQUEsU0FBQSxJQUFhLElBQUMsQ0FBQSxPQUFPLENBQUMsaUJBQXRCOztNQUNBLElBQVksQ0FBQyxDQUFDLEtBQUYsQ0FBUSxTQUFSLENBQVo7QUFBQSxpQkFBQTs7QUFKRjtXQUtBLElBQUMsQ0FBQSxNQUFELEdBQVU7RUFSSzs7OztHQW5CUSIsImZpbGUiOiJjbGFzc2VzL3N2Z1N0YWNrTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFN2Z1N0YWNrTm9kZSBleHRlbmRzIFN2Z1N0YWNrRWxlbWVudFxuICBjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG4gICAgc3VwZXIgb3B0aW9uc1xuICAgIEBfY2hpbGRyZW4gPSBbXVxuXG4gIGdldERlZmF1bHRPcHRpb25zOiAtPiBfLm1lcmdlIHN1cGVyKCksIGdyb3VwQ2hpbGRNYXJnaW46IDVcblxuICByZW5kZXJUbzogKF9wYXJlbnRFbCkgLT5cbiAgICBzdXBlciBfcGFyZW50RWxcbiAgICBmb3IgY2hpbGQgaW4gQF9jaGlsZHJlblxuICAgICAgY2hpbGQucmVuZGVyVG8gQF9lbFxuICAgIEBhcnJhbmdlQ2hpbGRyZW4oKVxuXG4gIGdldEhlaWdodDogLT4gQGhlaWdodFxuXG4gIGFkZENoaWxkOiAoY2hpbGQpIC0+XG4gICAgQF9jaGlsZHJlbi5wdXNoIGNoaWxkXG4gICAgY2hpbGRcblxuICBhcnJhbmdlQ2hpbGRyZW46IC0+XG4gICAgaGVpZ2h0QWNjID0gMFxuICAgIHJldHVybiB1bmxlc3MgQF9jaGlsZHJlbi5sZW5ndGhcbiAgICBmb3IgY2hpbGQsIGluZGV4IGluIEBfY2hpbGRyZW5cbiAgICAgIGNoaWxkLm1vdmVUbyAwLCBoZWlnaHRBY2NcbiAgICAgIGhlaWdodEFjYyArPSBjaGlsZC5nZXRIZWlnaHQoKVxuICAgICAgaGVpZ2h0QWNjICs9IEBvcHRpb25zLmdyb3VwQ2hpbGRNYXJnaW4gaWYgaW5kZXggPCBAX2NoaWxkcmVuLmxlbmd0aCAtIDFcbiAgICAgIGRlYnVnZ2VyIGlmIF8uaXNOYU4gaGVpZ2h0QWNjXG4gICAgQGhlaWdodCA9IGhlaWdodEFjY1xuIl19