var AbstractStackContainer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractStackContainer = (function(superClass) {
  extend(AbstractStackContainer, superClass);

  function AbstractStackContainer(parent, options) {
    AbstractStackContainer.__super__.constructor.call(this, parent, options);
    this._children = [];
  }

  AbstractStackContainer.prototype.moveTo = function(x, y) {
    this._el.move(x, y);
    return this;
  };

  AbstractStackContainer.prototype.moveBy = function(x, y) {
    this._el.dmove(x, y);
    return this;
  };

  AbstractStackContainer.prototype.getHeight = function() {
    return this._el.node.getBBox().height;
  };

  AbstractStackContainer.prototype.render = function() {
    var child, i, len, ref, results;
    AbstractStackContainer.__super__.render.call(this);
    ref = this._children;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      results.push(child.render());
    }
    return results;
  };

  AbstractStackContainer.prototype.addChild = function(child) {
    this._children.push(child);
    return child;
  };

  AbstractStackContainer.prototype.createChildElement = function() {
    throw new Error('Not Implemented');
  };

  return AbstractStackContainer;

})(AbstractStackElement);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvYWJzdHJhY3RTdGFja0NvbnRhaW5lci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxzQkFBQTtFQUFBOzs7QUFBTTs7O0VBQ1MsZ0NBQUMsTUFBRCxFQUFTLE9BQVQ7SUFDWCx3REFBTSxNQUFOLEVBQWMsT0FBZDtJQUNBLElBQUMsQ0FBQSxTQUFELEdBQWE7RUFGRjs7bUNBSWIsTUFBQSxHQUFRLFNBQUMsQ0FBRCxFQUFJLENBQUo7SUFDTixJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxDQUFWLEVBQWEsQ0FBYjtXQUNBO0VBRk07O21DQUlSLE1BQUEsR0FBUSxTQUFDLENBQUQsRUFBSSxDQUFKO0lBQ04sSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQWQ7V0FDQTtFQUZNOzttQ0FJUixTQUFBLEdBQVcsU0FBQTtXQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBQSxDQUFtQixDQUFDO0VBQXZCOzttQ0FFWCxNQUFBLEdBQVEsU0FBQTtBQUNOLFFBQUE7SUFBQSxpREFBQTtBQUNBO0FBQUE7U0FBQSxxQ0FBQTs7bUJBQ0UsS0FBSyxDQUFDLE1BQU4sQ0FBQTtBQURGOztFQUZNOzttQ0FLUixRQUFBLEdBQVUsU0FBQyxLQUFEO0lBQ1IsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLENBQWdCLEtBQWhCO1dBQ0E7RUFGUTs7bUNBSVYsa0JBQUEsR0FBb0IsU0FBQTtBQUFHLFVBQVUsSUFBQSxLQUFBLENBQU0saUJBQU47RUFBYjs7OztHQXhCZSIsImZpbGUiOiJjbGFzc2VzL2Fic3RyYWN0U3RhY2tDb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBYnN0cmFjdFN0YWNrQ29udGFpbmVyIGV4dGVuZHMgQWJzdHJhY3RTdGFja0VsZW1lbnRcbiAgY29uc3RydWN0b3I6IChwYXJlbnQsIG9wdGlvbnMpIC0+XG4gICAgc3VwZXIgcGFyZW50LCBvcHRpb25zXG4gICAgQF9jaGlsZHJlbiA9IFtdXG5cbiAgbW92ZVRvOiAoeCwgeSkgLT5cbiAgICBAX2VsLm1vdmUgeCwgeVxuICAgIEBcblxuICBtb3ZlQnk6ICh4LCB5KSAtPlxuICAgIEBfZWwuZG1vdmUgeCwgeVxuICAgIEBcblxuICBnZXRIZWlnaHQ6IC0+IEBfZWwubm9kZS5nZXRCQm94KCkuaGVpZ2h0XG5cbiAgcmVuZGVyOiAtPlxuICAgIHN1cGVyKClcbiAgICBmb3IgY2hpbGQgaW4gQF9jaGlsZHJlblxuICAgICAgY2hpbGQucmVuZGVyKClcblxuICBhZGRDaGlsZDogKGNoaWxkKSAtPlxuICAgIEBfY2hpbGRyZW4ucHVzaCBjaGlsZFxuICAgIGNoaWxkXG5cbiAgY3JlYXRlQ2hpbGRFbGVtZW50OiAtPiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBJbXBsZW1lbnRlZCdcbiJdfQ==