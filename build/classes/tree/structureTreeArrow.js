var StructureTreeArrow,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StructureTreeArrow = (function(superClass) {
  extend(StructureTreeArrow, superClass);

  function StructureTreeArrow() {
    return StructureTreeArrow.__super__.constructor.apply(this, arguments);
  }

  StructureTreeArrow.prototype.renderTo = function(_parentEl) {
    var cw, h, hw, i, len, line, lineLeft, lineRight, mw, pad, pos, ref, ref1, rh, rw;
    StructureTreeArrow.__super__.renderTo.call(this, _parentEl);
    ref = _.values(_.pick(this.options, 'arrowMainWidth', 'arrowPosition', 'arrowRootWidth', 'arrowRootHeight', 'arrowCapWidth', 'arrowPadding')), mw = ref[0], pos = ref[1], rw = ref[2], rh = ref[3], cw = ref[4], pad = ref[5];
    hw = rw + cw;
    h = hw + rh;
    this.height = h;
    lineLeft = this._el.line(0, h / 2, pos - rw - cw - pad, h / 2);
    lineRight = this._el.line(pos + rw + cw + pad, h / 2, mw, h / 2);
    ref1 = [lineLeft, lineRight];
    for (i = 0, len = ref1.length; i < len; i++) {
      line = ref1[i];
      line.stroke(this.options.arrowLineStroke).style('stroke-dasharray', this.options.arrowLineDasharray);
    }
    return this._el.path("M" + pos + " 0 h-" + rw + " v-" + rh + " h-" + cw + " l" + hw + ",-" + hw + " l" + hw + "," + hw + " h-" + cw + " v" + rh + " Z").stroke(this.options.arrowStroke).fill(this.options.arrowFill).dy(h);
  };

  StructureTreeArrow.prototype.getHeight = function() {
    return this.height;
  };

  return StructureTreeArrow;

})(StackElement);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvdHJlZS9zdHJ1Y3R1cmVUcmVlQXJyb3cuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0JBQUE7RUFBQTs7O0FBQU07Ozs7Ozs7K0JBQ0osUUFBQSxHQUFVLFNBQUMsU0FBRDtBQUNSLFFBQUE7SUFBQSxpREFBTSxTQUFOO0lBQ0EsTUFBNkIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxDQUFDLENBQUMsSUFBRixDQUFPLElBQUMsQ0FBQSxPQUFSLEVBQWlCLGdCQUFqQixFQUFtQyxlQUFuQyxFQUFvRCxnQkFBcEQsRUFBc0UsaUJBQXRFLEVBQXlGLGVBQXpGLEVBQTBHLGNBQTFHLENBQVQsQ0FBN0IsRUFBQyxXQUFELEVBQUssWUFBTCxFQUFVLFdBQVYsRUFBYyxXQUFkLEVBQWtCLFdBQWxCLEVBQXNCO0lBQ3RCLEVBQUEsR0FBSyxFQUFBLEdBQUs7SUFDVixDQUFBLEdBQUksRUFBQSxHQUFLO0lBQ1QsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLFFBQUEsR0FBVyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxDQUFWLEVBQWEsQ0FBQSxHQUFJLENBQWpCLEVBQW9CLEdBQUEsR0FBTSxFQUFOLEdBQVcsRUFBWCxHQUFnQixHQUFwQyxFQUF5QyxDQUFBLEdBQUksQ0FBN0M7SUFDWCxTQUFBLEdBQVksSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsR0FBQSxHQUFNLEVBQU4sR0FBVyxFQUFYLEdBQWdCLEdBQTFCLEVBQStCLENBQUEsR0FBSSxDQUFuQyxFQUFzQyxFQUF0QyxFQUEwQyxDQUFBLEdBQUksQ0FBOUM7QUFDWjtBQUFBLFNBQUEsc0NBQUE7O01BQ0UsSUFDRSxDQUFDLE1BREgsQ0FDVSxJQUFDLENBQUEsT0FBTyxDQUFDLGVBRG5CLENBRUUsQ0FBQyxLQUZILENBRVMsa0JBRlQsRUFFNkIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxrQkFGdEM7QUFERjtXQUlBLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLEdBQUEsR0FBSSxHQUFKLEdBQVEsT0FBUixHQUFlLEVBQWYsR0FBa0IsS0FBbEIsR0FBdUIsRUFBdkIsR0FBMEIsS0FBMUIsR0FBK0IsRUFBL0IsR0FBa0MsSUFBbEMsR0FBc0MsRUFBdEMsR0FBeUMsSUFBekMsR0FBNkMsRUFBN0MsR0FBZ0QsSUFBaEQsR0FBb0QsRUFBcEQsR0FBdUQsR0FBdkQsR0FBMEQsRUFBMUQsR0FBNkQsS0FBN0QsR0FBa0UsRUFBbEUsR0FBcUUsSUFBckUsR0FBeUUsRUFBekUsR0FBNEUsSUFBdEYsQ0FDRSxDQUFDLE1BREgsQ0FDVSxJQUFDLENBQUEsT0FBTyxDQUFDLFdBRG5CLENBRUUsQ0FBQyxJQUZILENBRVEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUZqQixDQUdFLENBQUMsRUFISCxDQUdNLENBSE47RUFaUTs7K0JBaUJWLFNBQUEsR0FBVyxTQUFBO1dBQUcsSUFBQyxDQUFBO0VBQUo7Ozs7R0FsQm9CIiwiZmlsZSI6ImNsYXNzZXMvdHJlZS9zdHJ1Y3R1cmVUcmVlQXJyb3cuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTdHJ1Y3R1cmVUcmVlQXJyb3cgZXh0ZW5kcyBTdGFja0VsZW1lbnRcbiAgcmVuZGVyVG86IChfcGFyZW50RWwpIC0+XG4gICAgc3VwZXIgX3BhcmVudEVsXG4gICAgW213LCBwb3MsIHJ3LCByaCwgY3csIHBhZF0gPSBfLnZhbHVlcyBfLnBpY2sgQG9wdGlvbnMsICdhcnJvd01haW5XaWR0aCcsICdhcnJvd1Bvc2l0aW9uJywgJ2Fycm93Um9vdFdpZHRoJywgJ2Fycm93Um9vdEhlaWdodCcsICdhcnJvd0NhcFdpZHRoJywgJ2Fycm93UGFkZGluZydcbiAgICBodyA9IHJ3ICsgY3dcbiAgICBoID0gaHcgKyByaFxuICAgIEBoZWlnaHQgPSBoXG4gICAgbGluZUxlZnQgPSBAX2VsLmxpbmUgMCwgaCAvIDIsIHBvcyAtIHJ3IC0gY3cgLSBwYWQsIGggLyAyXG4gICAgbGluZVJpZ2h0ID0gQF9lbC5saW5lIHBvcyArIHJ3ICsgY3cgKyBwYWQsIGggLyAyLCBtdywgaCAvIDJcbiAgICBmb3IgbGluZSBpbiBbbGluZUxlZnQsIGxpbmVSaWdodF1cbiAgICAgIGxpbmVcbiAgICAgICAgLnN0cm9rZSBAb3B0aW9ucy5hcnJvd0xpbmVTdHJva2VcbiAgICAgICAgLnN0eWxlICdzdHJva2UtZGFzaGFycmF5JywgQG9wdGlvbnMuYXJyb3dMaW5lRGFzaGFycmF5XG4gICAgQF9lbC5wYXRoIFwiTSN7cG9zfSAwIGgtI3tyd30gdi0je3JofSBoLSN7Y3d9IGwje2h3fSwtI3tod30gbCN7aHd9LCN7aHd9IGgtI3tjd30gdiN7cmh9IFpcIlxuICAgICAgLnN0cm9rZSBAb3B0aW9ucy5hcnJvd1N0cm9rZVxuICAgICAgLmZpbGwgQG9wdGlvbnMuYXJyb3dGaWxsXG4gICAgICAuZHkgaFxuXG4gIGdldEhlaWdodDogLT4gQGhlaWdodFxuIl19