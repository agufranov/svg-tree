var StackHtmlElement,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

StackHtmlElement = (function(superClass) {
  extend(StackHtmlElement, superClass);

  function StackHtmlElement(content1, options) {
    this.content = content1;
    StackHtmlElement.__super__.constructor.call(this, options);
    this.__wrapperEventHandlers = [];
    this.prepended = [];
    this.appended = [];
  }

  StackHtmlElement.prototype.getDefaultOptions = function() {
    return _.merge(StackHtmlElement.__super__.getDefaultOptions.call(this), {
      htmlPadding: 10,
      htmlWidth: null,
      htmlWrapperClass: 'content-wrapper',
      htmlRect: true,
      htmlRectStrokeColor: 'gray',
      htmlRectStrokeWidth: 1,
      htmlRectFill: '#EEF',
      htmlMinHeight: 30
    });
  };

  StackHtmlElement.prototype.renderTo = function(_parentEl) {
    StackHtmlElement.__super__.renderTo.call(this, _parentEl);
    if (this.options.htmlRect) {
      this._rect = this._el.rect().stroke({
        color: this.options.htmlRectStrokeColor,
        width: this.options.htmlRectStrokeWidth,
        dasharray: this.options.htmlRectStrokeDasharray
      }).fill(this.options.htmlRectFill);
    }
    this._foreignObject = this._el.foreignObject();
    return this._renderContents(false);
  };

  StackHtmlElement.prototype._renderContents = function(animate) {
    var el, foNode, i, innerWrapper, j, len, len1, ref, ref1, ref2, ref3, ref4, t, wrapperSize;
    if (!this._wrapper) {
      this._wrapper = $('<div>').addClass(this.options.htmlWrapperClass).addClass(this.options.htmlWrapperAdditionalClass).css({
        padding: this.options.htmlPadding,
        float: 'left',
        width: this.options.htmlWidth - 2 * this.options.htmlPadding,
        'min-height': this.options.htmlMinHeight
      }).data('stack-element', this).get(0);
      while (this.__wrapperEventHandlers.length > 0) {
        t = this.__wrapperEventHandlers.shift();
        (ref = $(this._wrapper)).on.apply(ref, t);
      }
    }
    innerWrapper = $('<div>').addClass('stack-html-inner-wrapper');
    innerWrapper.html(this.content);
    $(this._wrapper).html(innerWrapper);
    ref1 = this.prepended;
    for (i = 0, len = ref1.length; i < len; i++) {
      el = ref1[i];
      innerWrapper.before(el);
    }
    ref2 = this.appended;
    for (j = 0, len1 = ref2.length; j < len1; j++) {
      el = ref2[j];
      $(this._wrapper).append(el);
    }
    foNode = this._foreignObject.node;
    while (foNode.firstChild) {
      foNode.removeChild(foNode.firstChild);
    }
    foNode.appendChild(this._wrapper);
    wrapperSize = [$(this._wrapper).outerWidth(), $(this._wrapper).outerHeight()];
    this.height = wrapperSize[1];
    if (this.options.htmlRect) {
      (ref3 = this._animate(this._rect, animate)).size.apply(ref3, wrapperSize);
    }
    (ref4 = this._animate(this._foreignObject, animate)).size.apply(ref4, wrapperSize);
    return this._fireHeightChanged();
  };

  StackHtmlElement.prototype.getHeight = function() {
    return this.height;
  };

  StackHtmlElement.prototype.updateContent = function(content) {
    this.content = content;
    return this._renderContents(true);
  };

  StackHtmlElement.prototype.on = function() {
    var args, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (this._wrapper) {
      return (ref = $(this._wrapper)).on.apply(ref, args);
    } else {
      return this.__wrapperEventHandlers.push(args);
    }
  };

  return StackHtmlElement;

})(StackElement);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvc3RhY2tIdG1sRWxlbWVudC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxnQkFBQTtFQUFBOzs7O0FBQU07OztFQUNTLDBCQUFDLFFBQUQsRUFBVyxPQUFYO0lBQUMsSUFBQyxDQUFBLFVBQUQ7SUFDWixrREFBTSxPQUFOO0lBQ0EsSUFBQyxDQUFBLHNCQUFELEdBQTBCO0lBQzFCLElBQUMsQ0FBQSxTQUFELEdBQWE7SUFDYixJQUFDLENBQUEsUUFBRCxHQUFZO0VBSkQ7OzZCQU1iLGlCQUFBLEdBQW1CLFNBQUE7V0FBRyxDQUFDLENBQUMsS0FBRixDQUFRLHNEQUFBLENBQVIsRUFBaUI7TUFBQSxXQUFBLEVBQWEsRUFBYjtNQUFpQixTQUFBLEVBQVcsSUFBNUI7TUFBa0MsZ0JBQUEsRUFBa0IsaUJBQXBEO01BQXVFLFFBQUEsRUFBVSxJQUFqRjtNQUF1RixtQkFBQSxFQUFxQixNQUE1RztNQUFvSCxtQkFBQSxFQUFxQixDQUF6STtNQUE0SSxZQUFBLEVBQWMsTUFBMUo7TUFBa0ssYUFBQSxFQUFlLEVBQWpMO0tBQWpCO0VBQUg7OzZCQUVuQixRQUFBLEdBQVUsU0FBQyxTQUFEO0lBQ1IsK0NBQU0sU0FBTjtJQUNBLElBQWtMLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBM0w7TUFBQSxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFBLENBQVcsQ0FBQyxNQUFaLENBQW1CO1FBQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsbUJBQWhCO1FBQXFDLEtBQUEsRUFBTyxJQUFDLENBQUEsT0FBTyxDQUFDLG1CQUFyRDtRQUEwRSxTQUFBLEVBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyx1QkFBOUY7T0FBbkIsQ0FBeUksQ0FBQyxJQUExSSxDQUErSSxJQUFDLENBQUEsT0FBTyxDQUFDLFlBQXhKLEVBQVQ7O0lBQ0EsSUFBQyxDQUFBLGNBQUQsR0FBa0IsSUFBQyxDQUFBLEdB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QyxDQUFBLFFBQUgsQ0FBQSxDQUFZLENBQUMsRUFBYixZQUFnQixJQUFoQixFQURGO0tBQUEsTUFBQTthQUdFLElBQUMsQ0FBQSxzQkFBc0IsQ0FBQyxJQUF4QixDQUE2QixJQUE3QixFQUhGOztFQURFOzs7O0dBcER5QiIsImZpbGUiOiJjbGFzc2VzL3N0YWNrSHRtbEVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTdGFja0h0bWxFbGVtZW50IGV4dGVuZHMgU3RhY2tFbGVtZW50XG4gIGNvbnN0cnVjdG9yOiAoQGNvbnRlbnQsIG9wdGlvbnMpIC0+XG4gICAgc3VwZXIgb3B0aW9uc1xuICAgIEBfX3dyYXBwZXJFdmVudEhhbmRsZXJzID0gW11cbiAgICBAcHJlcGVuZGVkID0gW11cbiAgICBAYXBwZW5kZWQgPSBbXVxuXG4gIGdldERlZmF1bHRPcHRpb25zOiAtPiBfLm1lcmdlIHN1cGVyKCksIGh0bWxQYWRkaW5nOiAxMCwgaHRtbFdpZHRoOiBudWxsLCBodG1sV3JhcHBlckNsYXNzOiAnY29udGVudC13cmFwcGVyJywgaHRtbFJlY3Q6IHRydWUsIGh0bWxSZWN0U3Ryb2tlQ29sb3I6ICdncmF5JywgaHRtbFJlY3RTdHJva2VXaWR0aDogMSwgaHRtbFJlY3RGaWxsOiAnI0VFRicsIGh0bWxNaW5IZWlnaHQ6IDMwXG5cbiAgcmVuZGVyVG86IChfcGFyZW50RWwpIC0+XG4gICAgc3VwZXIgX3BhcmVudEVsXG4gICAgQF9yZWN0ID0gQF9lbC5yZWN0KCkuc3Ryb2tlKGNvbG9yOiBAb3B0aW9ucy5odG1sUmVjdFN0cm9rZUNvbG9yLCB3aWR0aDogQG9wdGlvbnMuaHRtbFJlY3RTdHJva2VXaWR0aCwgZGFzaGFycmF5OiBAb3B0aW9ucy5odG1sUmVjdFN0cm9rZURhc2hhcnJheSkuZmlsbChAb3B0aW9ucy5odG1sUmVjdEZpbGwpIGlmIEBvcHRpb25zLmh0bWxSZWN0XG4gICAgQF9mb3JlaWduT2JqZWN0ID0gQF9lbC5mb3JlaWduT2JqZWN0KClcbiAgICBAX3JlbmRlckNvbnRlbnRzIGZhbHNlXG5cbiAgX3JlbmRlckNvbnRlbnRzOiAoYW5pbWF0ZSkgLT5cbiAgICBpZiBub3QgQF93cmFwcGVyXG4gICAgICBAX3dyYXBwZXIgPSAkKCc8ZGl2PicpXG4gICAgICAgIC5hZGRDbGFzcyBAb3B0aW9ucy5odG1sV3JhcHBlckNsYXNzXG4gICAgICAgIC5hZGRDbGFzcyBAb3B0aW9ucy5odG1sV3JhcHBlckFkZGl0aW9uYWxDbGFzc1xuICAgICAgICAuY3NzIHBhZGRpbmc6IEBvcHRpb25zLmh0bWxQYWRkaW5nLCBmbG9hdDogJ2xlZnQnLCB3aWR0aDogQG9wdGlvbnMuaHRtbFdpZHRoIC0gMiAqIEBvcHRpb25zLmh0bWxQYWRkaW5nLCAnbWluLWhlaWdodCc6IEBvcHRpb25zLmh0bWxNaW5IZWlnaHRcbiAgICAgICAgLmRhdGEgJ3N0YWNrLWVsZW1lbnQnLCBAXG4gICAgICAgIC5nZXQgMFxuICAgICAgd2hpbGUgQF9fd3JhcHBlckV2ZW50SGFuZGxlcnMubGVuZ3RoID4gMFxuICAgICAgICB0ID0gQF9fd3JhcHBlckV2ZW50SGFuZGxlcnMuc2hpZnQoKVxuICAgICAgICAkKEBfd3JhcHBlcikub24gdC4uLlxuXG4gICAgaW5uZXJXcmFwcGVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnc3RhY2staHRtbC1pbm5lci13cmFwcGVyJylcbiAgICBpbm5lcldyYXBwZXIuaHRtbCBAY29udGVudFxuICAgICQoQF93cmFwcGVyKS5odG1sIGlubmVyV3JhcHBlclxuXG4gICAgZm9yIGVsIGluIEBwcmVwZW5kZWRcbiAgICAgIGlubmVyV3JhcHBlci5iZWZvcmUgZWxcblxuICAgIGZvciBlbCBpbiBAYXBwZW5kZWRcbiAgICAgICQoQF93cmFwcGVyKS5hcHBlbmQgZWxcblxuICAgIGZvTm9kZSA9IEBfZm9yZWlnbk9iamVjdC5ub2RlXG4gICAgZm9Ob2RlLnJlbW92ZUNoaWxkKGZvTm9kZS5maXJzdENoaWxkKSB3aGlsZSBmb05vZGUuZmlyc3RDaGlsZFxuICAgIGZvTm9kZS5hcHBlbmRDaGlsZCBAX3dyYXBwZXJcbiAgICB3cmFwcGVyU2l6ZSA9IFsgJChAX3dyYXBwZXIpLm91dGVyV2lkdGgoKSwgJChAX3dyYXBwZXIpLm91dGVySGVpZ2h0KCkgXVxuICAgIEBoZWlnaHQgPSB3cmFwcGVyU2l6ZVsxXVxuICAgIEBfYW5pbWF0ZShAX3JlY3QsIGFuaW1hdGUpLnNpemUod3JhcHBlclNpemUuLi4pIGlmIEBvcHRpb25zLmh0bWxSZWN0XG4gICAgQF9hbmltYXRlKEBfZm9yZWlnbk9iamVjdCwgYW5pbWF0ZSkuc2l6ZSh3cmFwcGVyU2l6ZS4uLilcbiAgICBAX2ZpcmVIZWlnaHRDaGFuZ2VkKClcblxuICBnZXRIZWlnaHQ6IC0+IEBoZWlnaHRcblxuICB1cGRhdGVDb250ZW50OiAoY29udGVudCkgLT5cbiAgICBAY29udGVudCA9IGNvbnRlbnRcbiAgICBAX3JlbmRlckNvbnRlbnRzIHRydWVcblxuICBvbjogKGFyZ3MuLi4pIC0+XG4gICAgaWYgQF93cmFwcGVyXG4gICAgICAkKEBfd3JhcHBlcikub24gYXJncy4uLlxuICAgIGVsc2VcbiAgICAgIEBfX3dyYXBwZXJFdmVudEhhbmRsZXJzLnB1c2ggYXJnc1xuIl19