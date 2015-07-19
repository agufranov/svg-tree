var StructureTreeUnbindedX,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StructureTreeUnbindedX = (function(superClass) {
  extend(StructureTreeUnbindedX, superClass);

  function StructureTreeUnbindedX() {
    return StructureTreeUnbindedX.__super__.constructor.apply(this, arguments);
  }

  StructureTreeUnbindedX.prototype.renderTo = function(_parentEl) {
    var size;
    StructureTreeUnbindedX.__super__.renderTo.call(this, _parentEl);
    this._el.text('x').stroke({
      color: 'red',
      width: 0.3
    });
    size = this._el.node.getBBox();
    this._el.dx(this.options.xMargin - size.width / 2);
    return this.height = size.height * 2;
  };

  StructureTreeUnbindedX.prototype.getHeight = function() {
    return this.height;
  };

  return StructureTreeUnbindedX;

})(StackElement);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvdHJlZS9zdHJ1Y3R1cmVUcmVlVW5iaW5kZWRYLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLHNCQUFBO0VBQUE7OztBQUFNOzs7Ozs7O21DQUNKLFFBQUEsR0FBVSxTQUFDLFNBQUQ7QUFDUixRQUFBO0lBQUEscURBQU0sU0FBTjtJQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLEdBQVYsQ0FBYyxDQUFDLE1BQWYsQ0FBc0I7TUFBQSxLQUFBLEVBQU8sS0FBUDtNQUFjLEtBQUEsRUFBTyxHQUFyQjtLQUF0QjtJQUNBLElBQUEsR0FBTyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFWLENBQUE7SUFDUCxJQUFDLENBQUEsR0FBRyxDQUFDLEVBQUwsQ0FBUSxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsR0FBbUIsSUFBSSxDQUFDLEtBQUwsR0FBYSxDQUF4QztXQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBSSxDQUFDLE1BQUwsR0FBYztFQUxoQjs7bUNBT1YsU0FBQSxHQUFXLFNBQUE7V0FBRyxJQUFDLENBQUE7RUFBSjs7OztHQVJ3QiIsImZpbGUiOiJjbGFzc2VzL3RyZWUvc3RydWN0dXJlVHJlZVVuYmluZGVkWC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFN0cnVjdHVyZVRyZWVVbmJpbmRlZFggZXh0ZW5kcyBTdGFja0VsZW1lbnRcbiAgcmVuZGVyVG86IChfcGFyZW50RWwpIC0+XG4gICAgc3VwZXIgX3BhcmVudEVsXG4gICAgQF9lbC50ZXh0KCd4Jykuc3Ryb2tlKGNvbG9yOiAncmVkJywgd2lkdGg6IDAuMylcbiAgICBzaXplID0gQF9lbC5ub2RlLmdldEJCb3goKVxuICAgIEBfZWwuZHggQG9wdGlvbnMueE1hcmdpbiAtIHNpemUud2lkdGggLyAyXG4gICAgQGhlaWdodCA9IHNpemUuaGVpZ2h0ICogMlxuXG4gIGdldEhlaWdodDogLT4gQGhlaWdodFxuIl19