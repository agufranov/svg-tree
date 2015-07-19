var SvgStackContainer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SvgStackContainer = (function(superClass) {
  extend(SvgStackContainer, superClass);

  function SvgStackContainer(options) {
    SvgStackContainer.__super__.constructor.call(this, options);
    this._children = [];
  }

  SvgStackContainer.prototype.getDefaultOptions = function() {
    return _.merge(SvgStackContainer.__super__.getDefaultOptions.call(this), {
      groupChildMargin: 5
    });
  };

  SvgStackContainer.prototype.renderTo = function(_parentEl) {
    var child, i, len, ref;
    SvgStackContainer.__super__.renderTo.call(this, _parentEl);
    ref = this._children;
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      child.renderTo(this._el);
    }
    return this.arrangeChildren();
  };

  SvgStackContainer.prototype.getHeight = function() {
    return this.height;
  };

  SvgStackContainer.prototype.addChild = function(child) {
    this._children.push(child);
    return child;
  };

  SvgStackContainer.prototype.arrangeChildren = function() {
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

  return SvgStackContainer;

})(SvgStackElement);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvc3ZnU3RhY2tDb250YWluZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsaUJBQUE7RUFBQTs7O0FBQU07OztFQUNTLDJCQUFDLE9BQUQ7SUFDWCxtREFBTSxPQUFOO0lBQ0EsSUFBQyxDQUFBLFNBQUQsR0FBYTtFQUZGOzs4QkFJYixpQkFBQSxHQUFtQixTQUFBO1dBQUcsQ0FBQyxDQUFDLEtBQUYsQ0FBUSx1REFBQSxDQUFSLEVBQWlCO01BQUEsZ0JBQUEsRUFBa0IsQ0FBbEI7S0FBakI7RUFBSDs7OEJBRW5CLFFBQUEsR0FBVSxTQUFDLFNBQUQ7QUFDUixRQUFBO0lBQUEsZ0RBQU0sU0FBTjtBQUNBO0FBQUEsU0FBQSxxQ0FBQTs7TUFDRSxLQUFLLENBQUMsUUFBTixDQUFlLElBQUMsQ0FBQSxHQUFoQjtBQURGO1dBRUEsSUFBQyxDQUFBLGVBQUQsQ0FBQTtFQUpROzs4QkFNVixTQUFBLEdBQVcsU0FBQTtXQUFHLElBQUMsQ0FBQTtFQUFKOzs4QkFFWCxRQUFBLEdBQVUsU0FBQyxLQUFEO0lBQ1IsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLENBQWdCLEtBQWhCO1dBQ0E7RUFGUTs7OEJBSVYsZUFBQSxHQUFpQixTQUFBO0FBQ2YsUUFBQTtJQUFBLFNBQUEsR0FBWTtJQUNaLElBQUEsQ0FBYyxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQXpCO0FBQUEsYUFBQTs7QUFDQTtBQUFBLFNBQUEscURBQUE7O01BQ0UsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFiLEVBQWdCLFNBQWhCO01BQ0EsU0FBQSxJQUFhLEtBQUssQ0FBQyxTQUFOLENBQUE7TUFDYixJQUEwQyxLQUFBLEdBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLEdBQW9CLENBQXRFO1FBQUEsU0FBQSxJQUFhLElBQUMsQ0FBQSxPQUFPLENBQUMsaUJBQXRCOztNQUNBLElBQVksQ0FBQyxDQUFDLEtBQUYsQ0FBUSxTQUFSLENBQVo7QUFBQSxpQkFBQTs7QUFKRjtXQUtBLElBQUMsQ0FBQSxNQUFELEdBQVU7RUFSSzs7OztHQW5CYSIsImZpbGUiOiJjbGFzc2VzL3N2Z1N0YWNrQ29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3ZnU3RhY2tDb250YWluZXIgZXh0ZW5kcyBTdmdTdGFja0VsZW1lbnRcbiAgY29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuICAgIHN1cGVyIG9wdGlvbnNcbiAgICBAX2NoaWxkcmVuID0gW11cblxuICBnZXREZWZhdWx0T3B0aW9uczogLT4gXy5tZXJnZSBzdXBlcigpLCBncm91cENoaWxkTWFyZ2luOiA1XG5cbiAgcmVuZGVyVG86IChfcGFyZW50RWwpIC0+XG4gICAgc3VwZXIgX3BhcmVudEVsXG4gICAgZm9yIGNoaWxkIGluIEBfY2hpbGRyZW5cbiAgICAgIGNoaWxkLnJlbmRlclRvIEBfZWxcbiAgICBAYXJyYW5nZUNoaWxkcmVuKClcblxuICBnZXRIZWlnaHQ6IC0+IEBoZWlnaHRcblxuICBhZGRDaGlsZDogKGNoaWxkKSAtPlxuICAgIEBfY2hpbGRyZW4ucHVzaCBjaGlsZFxuICAgIGNoaWxkXG5cbiAgYXJyYW5nZUNoaWxkcmVuOiAtPlxuICAgIGhlaWdodEFjYyA9IDBcbiAgICByZXR1cm4gdW5sZXNzIEBfY2hpbGRyZW4ubGVuZ3RoXG4gICAgZm9yIGNoaWxkLCBpbmRleCBpbiBAX2NoaWxkcmVuXG4gICAgICBjaGlsZC5tb3ZlVG8gMCwgaGVpZ2h0QWNjXG4gICAgICBoZWlnaHRBY2MgKz0gY2hpbGQuZ2V0SGVpZ2h0KClcbiAgICAgIGhlaWdodEFjYyArPSBAb3B0aW9ucy5ncm91cENoaWxkTWFyZ2luIGlmIGluZGV4IDwgQF9jaGlsZHJlbi5sZW5ndGggLSAxXG4gICAgICBkZWJ1Z2dlciBpZiBfLmlzTmFOIGhlaWdodEFjY1xuICAgIEBoZWlnaHQgPSBoZWlnaHRBY2NcbiJdfQ==