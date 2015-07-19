var StackHtmlDepElement,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StackHtmlDepElement = (function(superClass) {
  extend(StackHtmlDepElement, superClass);

  function StackHtmlDepElement(leftContent, rightContent, options) {
    var leftOptions, rightOptions;
    this.leftContent = leftContent;
    this.rightContent = rightContent;
    StackHtmlDepElement.__super__.constructor.call(this, options);
    leftOptions = _.merge({
      htmlWidth: this.options.depWidth,
      htmlWrapperAdditionalClass: 'dep-wrapper',
      htmlRectFill: '#F5F5FF',
      htmlRectStrokeDasharray: this.options.depDasharray
    }, this.options);
    rightOptions = _.merge({
      htmlWidth: this.options.depMainWidth,
      htmlWrapperAdditionalClass: 'dep-wrapper',
      ignoreHeight: this.options.depIgnoreDepHeight
    }, this.options);
    this._leftComponent = new StackHtmlElement(this.leftContent, leftOptions);
    this._rightComponent = new StackHtmlElement(this.rightContent, rightOptions);
    this.addChild(this._leftComponent);
    this.addChild(this._rightComponent);
    this._leftComponent.dep = this._rightComponent.dep = this;
  }

  StackHtmlDepElement.prototype.getDefaultOptions = function() {
    return _.merge(StackHtmlDepElement.__super__.getDefaultOptions.call(this), {
      vertMargin: this.options.depWidth + 30,
      depDasharray: '10 5'
    });
  };

  StackHtmlDepElement.prototype._arrange = function(animate) {
    StackHtmlDepElement.__super__._arrange.call(this, animate);
    return this._drawArrow();
  };

  StackHtmlDepElement.prototype._drawArrow = function() {
    var h2, points;
    h2 = this.getHeight() / 2;
    points = [[this.options.depWidth, h2], [this.options.vertMargin, h2]];
    if (!this._arrow) {
      return this._arrow = this._el.polyline(points).stroke(this.options.depLineStroke);
    } else {
      return this._animate(this._arrow, true).plot(points);
    }
  };

  return StackHtmlDepElement;

})(StackVerticalContainer);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvc3RhY2tIdG1sRGVwRWxlbWVudC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxtQkFBQTtFQUFBOzs7QUFBTTs7O0VBRVMsNkJBQUMsV0FBRCxFQUFlLFlBQWYsRUFBOEIsT0FBOUI7QUFDWCxRQUFBO0lBRFksSUFBQyxDQUFBLGNBQUQ7SUFBYyxJQUFDLENBQUEsZUFBRDtJQUMxQixxREFBTSxPQUFOO0lBQ0EsV0FBQSxHQUFjLENBQUMsQ0FBQyxLQUFGLENBQVE7TUFBQSxTQUFBLEVBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFwQjtNQUE4QiwwQkFBQSxFQUE0QixhQUExRDtNQUF5RSxZQUFBLEVBQWMsU0FBdkY7TUFBa0csdUJBQUEsRUFBeUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFwSTtLQUFSLEVBQTBKLElBQUMsQ0FBQSxPQUEzSjtJQUNkLFlBQUEsR0FBZSxDQUFDLENBQUMsS0FBRixDQUFRO01BQUEsU0FBQSxFQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsWUFBcEI7TUFBa0MsMEJBQUEsRUFBNEIsYUFBOUQ7TUFBNkUsWUFBQSxFQUFjLElBQUMsQ0FBQSxPQUFPLENBQUMsa0JBQXBHO0tBQVIsRUFBZ0ksSUFBQyxDQUFBLE9BQWpJO0lBQ2YsSUFBQyxDQUFBLGNBQUQsR0FBc0IsSUFBQSxnQkFBQSxDQUFpQixJQUFDLENBQUEsV0FBbEIsRUFBK0IsV0FBL0I7SUFDdEIsSUFBQyxDQUFBLGVBQUQsR0FBdUIsSUFBQSxnQkFBQSxDQUFpQixJQUFDLENBQUEsWUFBbEIsRUFBZ0MsWUFBaEM7SUFDdkIsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsY0FBWDtJQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLGVBQVg7SUFFQSxJQUFDLENBQUEsY0FBYyxDQUFDLEdBQWhCLEdBQXNCLElBQUMsQ0FBQSxlQUFlLENBQUMsR0FBakIsR0FBdUI7RUFUbEM7O2dDQVdiLGlCQUFBLEdBQW1CLFNBQUE7V0FBRyxDQUFDLENBQUMsS0FBRixDQUFRLHlEQUFBLENBQVIsRUFBaUI7TUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFULEdBQW9CLEVBQWhDO01BQW9DLFlBQUEsRUFBYyxNQUFsRDtLQUFqQjtFQUFIOztnQ0FFbkIsUUFBQSxHQUFVLFNBQUMsT0FBRDtJQUNSLGtEQUFNLE9BQU47V0FDQSxJQUFDLENBQUEsVUFBRCxDQUFBO0VBRlE7O2dDQUlWLFVBQUEsR0FBWSxTQUFBO0FBQ1YsUUFBQTtJQUFBLEVBQUEsR0FBSyxJQUFDLENBQUEsU0FBRCxDQUFBLENBQUEsR0FBZTtJQUNwQixNQUFBLEdBQVMsQ0FBQyxDQUFDLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBVixFQUFvQixFQUFwQixDQUFELEVBQTBCLENBQUMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFWLEVBQXNCLEVBQXRCLENBQTFCO0lBQ1QsSUFBRyxDQUFJLElBQUMsQ0FBQSxNQUFSO2FBQ0UsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQUMsTUFBdEIsQ0FBNkIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxhQUF0QyxFQURaO0tBQUEsTUFBQTthQUdFLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLE1BQVgsRUFBbUIsSUFBbkIsQ0FBd0IsQ0FBQyxJQUF6QixDQUE4QixNQUE5QixFQUhGOztFQUhVOzs7O0dBbkJvQiIsImZpbGUiOiJjbGFzc2VzL3N0YWNrSHRtbERlcEVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTdGFja0h0bWxEZXBFbGVtZW50IGV4dGVuZHMgU3RhY2tWZXJ0aWNhbENvbnRhaW5lclxuICAjIFRPRE8gQXJyb3dcbiAgY29uc3RydWN0b3I6IChAbGVmdENvbnRlbnQsIEByaWdodENvbnRlbnQsIG9wdGlvbnMpIC0+XG4gICAgc3VwZXIgb3B0aW9uc1xuICAgIGxlZnRPcHRpb25zID0gXy5tZXJnZSBodG1sV2lkdGg6IEBvcHRpb25zLmRlcFdpZHRoLCBodG1sV3JhcHBlckFkZGl0aW9uYWxDbGFzczogJ2RlcC13cmFwcGVyJywgaHRtbFJlY3RGaWxsOiAnI0Y1RjVGRicsIGh0bWxSZWN0U3Ryb2tlRGFzaGFycmF5OiBAb3B0aW9ucy5kZXBEYXNoYXJyYXksIEBvcHRpb25zXG4gICAgcmlnaHRPcHRpb25zID0gXy5tZXJnZSBodG1sV2lkdGg6IEBvcHRpb25zLmRlcE1haW5XaWR0aCwgaHRtbFdyYXBwZXJBZGRpdGlvbmFsQ2xhc3M6ICdkZXAtd3JhcHBlcicsIGlnbm9yZUhlaWdodDogQG9wdGlvbnMuZGVwSWdub3JlRGVwSGVpZ2h0LCBAb3B0aW9uc1xuICAgIEBfbGVmdENvbXBvbmVudCA9IG5ldyBTdGFja0h0bWxFbGVtZW50IEBsZWZ0Q29udGVudCwgbGVmdE9wdGlvbnNcbiAgICBAX3JpZ2h0Q29tcG9uZW50ID0gbmV3IFN0YWNrSHRtbEVsZW1lbnQgQHJpZ2h0Q29udGVudCwgcmlnaHRPcHRpb25zXG4gICAgQGFkZENoaWxkIEBfbGVmdENvbXBvbmVudFxuICAgIEBhZGRDaGlsZCBAX3JpZ2h0Q29tcG9uZW50XG5cbiAgICBAX2xlZnRDb21wb25lbnQuZGVwID0gQF9yaWdodENvbXBvbmVudC5kZXAgPSBAICMgZGVidWdcblxuICBnZXREZWZhdWx0T3B0aW9uczogLT4gXy5tZXJnZSBzdXBlcigpLCB2ZXJ0TWFyZ2luOiBAb3B0aW9ucy5kZXBXaWR0aCArIDMwLCBkZXBEYXNoYXJyYXk6ICcxMCA1J1xuXG4gIF9hcnJhbmdlOiAoYW5pbWF0ZSkgLT5cbiAgICBzdXBlciBhbmltYXRlXG4gICAgQF9kcmF3QXJyb3coKVxuXG4gIF9kcmF3QXJyb3c6IC0+XG4gICAgaDIgPSBAZ2V0SGVpZ2h0KCkgLyAyXG4gICAgcG9pbnRzID0gW1tAb3B0aW9ucy5kZXBXaWR0aCwgaDJdLCBbQG9wdGlvbnMudmVydE1hcmdpbiwgaDJdXVxuICAgIGlmIG5vdCBAX2Fycm93XG4gICAgICBAX2Fycm93ID0gQF9lbC5wb2x5bGluZShwb2ludHMpLnN0cm9rZShAb3B0aW9ucy5kZXBMaW5lU3Ryb2tlKVxuICAgIGVsc2VcbiAgICAgIEBfYW5pbWF0ZShAX2Fycm93LCB0cnVlKS5wbG90KHBvaW50cylcbiJdfQ==