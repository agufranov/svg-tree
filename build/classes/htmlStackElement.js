var HtmlSvgStackElement,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

HtmlSvgStackElement = (function(superClass) {
  extend(HtmlSvgStackElement, superClass);

  function HtmlSvgStackElement(content, options) {
    this.content = content;
    HtmlSvgStackElement.__super__.constructor.call(this, options);
  }

  HtmlSvgStackElement.prototype.getDefaultOptions = function() {
    return _.merge(HtmlSvgStackElement.__super__.getDefaultOptions.call(this), {
      htmlPadding: 10,
      htmlWidth: null
    });
  };

  HtmlSvgStackElement.prototype.renderTo = function(_parentEl) {
    var f, r, wrapper, wrapperSize;
    HtmlSvgStackElement.__super__.renderTo.call(this, _parentEl);
    r = this._el.rect();
    f = this._el.foreignObject();
    wrapper = $('<div>').css({
      padding: this.options.htmlPadding,
      float: 'left',
      width: this.options.htmlWidth
    }).html(this.content);
    f.appendChild(wrapper[0]);
    wrapperSize = [wrapper.outerWidth(), wrapper.outerHeight()];
    r.size.apply(r, wrapperSize);
    return f.size.apply(f, wrapperSize);
  };

  return HtmlSvgStackElement;

})(SvgStackElement);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvaHRtbFN0YWNrRWxlbWVudC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxtQkFBQTtFQUFBOzs7QUFBTTs7O0VBQ1MsNkJBQUMsT0FBRCxFQUFXLE9BQVg7SUFBQyxJQUFDLENBQUEsVUFBRDtJQUNaLHFEQUFNLE9BQU47RUFEVzs7Z0NBR2IsaUJBQUEsR0FBbUIsU0FBQTtXQUFHLENBQUMsQ0FBQyxLQUFGLENBQVEseURBQUEsQ0FBUixFQUFpQjtNQUFBLFdBQUEsRUFBYSxFQUFiO01BQWlCLFNBQUEsRUFBVyxJQUE1QjtLQUFqQjtFQUFIOztnQ0FFbkIsUUFBQSxHQUFVLFNBQUMsU0FBRDtBQUNSLFFBQUE7SUFBQSxrREFBTSxTQUFOO0lBQ0EsQ0FBQSxHQUFJLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFBO0lBQ0osQ0FBQSxHQUFJLElBQUMsQ0FBQSxHQUFHLENBQUMsYUFBTCxDQUFBO0lBQ0osT0FBQSxHQUFVLENBQUEsQ0FBRSxPQUFGLENBQVUsQ0FBQyxHQUFYLENBQWU7TUFBQSxPQUFBLEVBQVMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxXQUFsQjtNQUErQixLQUFBLEVBQU8sTUFBdEM7TUFBOEMsS0FBQSxFQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBOUQ7S0FBZixDQUF1RixDQUFDLElBQXhGLENBQTZGLElBQUMsQ0FBQSxPQUE5RjtJQUNWLENBQUMsQ0FBQyxXQUFGLENBQWMsT0FBUSxDQUFBLENBQUEsQ0FBdEI7SUFDQSxXQUFBLEdBQWMsQ0FBRSxPQUFPLENBQUMsVUFBUixDQUFBLENBQUYsRUFBd0IsT0FBTyxDQUFDLFdBQVIsQ0FBQSxDQUF4QjtJQUNkLENBQUMsQ0FBQyxJQUFGLFVBQU8sV0FBUDtXQUNBLENBQUMsQ0FBQyxJQUFGLFVBQU8sV0FBUDtFQVJROzs7O0dBTnNCIiwiZmlsZSI6ImNsYXNzZXMvaHRtbFN0YWNrRWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEh0bWxTdmdTdGFja0VsZW1lbnQgZXh0ZW5kcyBTdmdTdGFja0VsZW1lbnRcbiAgY29uc3RydWN0b3I6IChAY29udGVudCwgb3B0aW9ucykgLT5cbiAgICBzdXBlciBvcHRpb25zXG5cbiAgZ2V0RGVmYXVsdE9wdGlvbnM6IC0+IF8ubWVyZ2Ugc3VwZXIoKSwgaHRtbFBhZGRpbmc6IDEwLCBodG1sV2lkdGg6IG51bGxcblxuICByZW5kZXJUbzogKF9wYXJlbnRFbCkgLT5cbiAgICBzdXBlciBfcGFyZW50RWxcbiAgICByID0gQF9lbC5yZWN0KClcbiAgICBmID0gQF9lbC5mb3JlaWduT2JqZWN0KClcbiAgICB3cmFwcGVyID0gJCgnPGRpdj4nKS5jc3MocGFkZGluZzogQG9wdGlvbnMuaHRtbFBhZGRpbmcsIGZsb2F0OiAnbGVmdCcsIHdpZHRoOiBAb3B0aW9ucy5odG1sV2lkdGgpLmh0bWwgQGNvbnRlbnRcbiAgICBmLmFwcGVuZENoaWxkIHdyYXBwZXJbMF1cbiAgICB3cmFwcGVyU2l6ZSA9IFsgd3JhcHBlci5vdXRlcldpZHRoKCksIHdyYXBwZXIub3V0ZXJIZWlnaHQoKSBdXG4gICAgci5zaXplIHdyYXBwZXJTaXplLi4uXG4gICAgZi5zaXplIHdyYXBwZXJTaXplLi4uXG4iXX0=