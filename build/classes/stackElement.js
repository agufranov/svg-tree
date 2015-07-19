var StackElement;

StackElement = (function() {
  function StackElement(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, this.getDefaultOptions());
    this.__heightChangedCallbacks = [];
  }

  StackElement.prototype.getDefaultOptions = function() {
    return {
      animationDuration: 500
    };
  };

  StackElement.prototype.moveTo = function(x, y, animate) {
    var el;
    if (animate == null) {
      animate = false;
    }
    el = this._animate(this._el, animate);
    if (x !== null) {
      if (y !== null) {
        el.move(x, y);
      } else {
        el.x(x);
      }
    } else {
      if (y !== null) {
        el.y(y);
      } else {
        throw new Error('x either y must be not null');
      }
    }
    return this;
  };

  StackElement.prototype.moveBy = function(x, y, animate) {
    var el;
    if (animate == null) {
      animate = false;
    }
    el = this._animate(this._el, animate);
    el.dmove(x, y);
    return this;
  };

  StackElement.prototype.getHeight = function() {
    return this._el.node.getBBox().height;
  };

  StackElement.prototype.renderTo = function(_parentEl) {
    this._parentEl = _parentEl;
    return this._el = this._createEl().addClass(this.__proto__.constructor.name);
  };

  StackElement.prototype._createEl = function() {
    return this._parentEl.group();
  };

  StackElement.prototype.visible = function() {
    return this._el.visible();
  };

  StackElement.prototype.show = function() {
    return this._el.show();
  };

  StackElement.prototype.hide = function() {
    return this._el.hide();
  };

  StackElement.prototype.toggle = function() {
    if (this.visible()) {
      return this.hide();
    } else {
      return this.show();
    }
  };

  StackElement.prototype.fadeIn = function(cb) {
    this._el.show();
    return setTimeout((function(_this) {
      return function() {
        return _this._animate(_this._el, true).opacity(1).after(function() {
          if (cb) {
            return cb();
          }
        });
      };
    })(this), 0);
  };

  StackElement.prototype.fadeOut = function(cb) {
    return this._animate(this._el, true).opacity(0).after((function(_this) {
      return function() {
        _this._el.hide();
        if (cb) {
          return cb();
        }
      };
    })(this));
  };

  StackElement.prototype.fadeToggle = function(cb) {
    if (this.visible()) {
      return this.fadeOut(cb);
    } else {
      this.fadeIn();
      if (cb) {
        return cb();
      }
    }
  };

  StackElement.prototype.ignoreHeight = function() {
    return this.options.ignoreHeight || !this.visible();
  };

  StackElement.prototype._animate = function(svg, animate) {
    if (animate) {
      return svg.animate(this.options.animationDuration);
    } else {
      return svg;
    }
  };

  StackElement.prototype.onHeightChanged = function(cb) {
    return this.__heightChangedCallbacks.push(cb);
  };

  StackElement.prototype._fireHeightChanged = function() {
    var cb, i, len, ref, results;
    ref = this.__heightChangedCallbacks;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      cb = ref[i];
      results.push(cb(this, this.getHeight()));
    }
    return results;
  };

  return StackElement;

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvc3RhY2tFbGVtZW50LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFNO0VBQ1Msc0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFXO0lBQ3ZCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFBcUIsSUFBQyxDQUFBLGlCQUFELENBQUEsQ0FBckI7SUFDQSxJQUFDLENBQUEsd0JBQUQsR0FBNEI7RUFGakI7O3lCQUliLGlCQUFBLEdBQW1CLFNBQUE7V0FBRztNQUFBLGlCQUFBLEVBQW1CLEdBQW5COztFQUFIOzt5QkFFbkIsTUFBQSxHQUFRLFNBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxPQUFQO0FBQ04sUUFBQTs7TUFEYSxVQUFVOztJQUN2QixFQUFBLEdBQUssSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsR0FBWCxFQUFnQixPQUFoQjtJQUNMLElBQUcsQ0FBQSxLQUFPLElBQVY7TUFDRSxJQUFHLENBQUEsS0FBTyxJQUFWO1FBQ0UsRUFBRSxDQUFDLElBQUgsQ0FBUSxDQUFSLEVBQVcsQ0FBWCxFQURGO09BQUEsTUFBQTtRQUdFLEVBQUUsQ0FBQyxDQUFILENBQUssQ0FBTCxFQUhGO09BREY7S0FBQSxNQUFBO01BTUUsSUFBRyxDQUFBLEtBQU8sSUFBVjtRQUNFLEVBQUUsQ0FBQyxDQUFILENBQUssQ0FBTCxFQURGO09BQUEsTUFBQTtBQUdFLGNBQVUsSUFBQSxLQUFBLENBQU0sNkJBQU4sRUFIWjtPQU5GOztXQVVBO0VBWk07O3lCQWNSLE1BQUEsR0FBUSxTQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sT0FBUDtBQUNOLFFBQUE7O01BRGEsVUFBVTs7SUFDdkIsRUFBQSxHQUFLLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLEdBQVgsRUFBZ0IsT0FBaEI7SUFDTCxFQUFFLENBQUMsS0FBSCxDQUFTLENBQVQsRUFBWSxDQUFaO1dBQ0E7RUFITTs7eUJBS1Is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a0IiLCJmaWxlIjoiY2xhc3Nlcy9zdGFja0VsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTdGFja0VsZW1lbnRcbiAgY29uc3RydWN0b3I6IChAb3B0aW9ucyA9IHt9KSAtPlxuICAgIF8uZGVmYXVsdHMgQG9wdGlvbnMsIEBnZXREZWZhdWx0T3B0aW9ucygpXG4gICAgQF9faGVpZ2h0Q2hhbmdlZENhbGxiYWNrcyA9IFtdXG5cbiAgZ2V0RGVmYXVsdE9wdGlvbnM6IC0+IGFuaW1hdGlvbkR1cmF0aW9uOiA1MDBcblxuICBtb3ZlVG86ICh4LCB5LCBhbmltYXRlID0gZmFsc2UpIC0+XG4gICAgZWwgPSBAX2FuaW1hdGUgQF9lbCwgYW5pbWF0ZVxuICAgIGlmIHggaXNudCBudWxsXG4gICAgICBpZiB5IGlzbnQgbnVsbFxuICAgICAgICBlbC5tb3ZlIHgsIHlcbiAgICAgIGVsc2VcbiAgICAgICAgZWwueCB4XG4gICAgZWxzZVxuICAgICAgaWYgeSBpc250IG51bGxcbiAgICAgICAgZWwueSB5XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvciAneCBlaXRoZXIgeSBtdXN0IGJlIG5vdCBudWxsJ1xuICAgIEBcblxuICBtb3ZlQnk6ICh4LCB5LCBhbmltYXRlID0gZmFsc2UpIC0+XG4gICAgZWwgPSBAX2FuaW1hdGUgQF9lbCwgYW5pbWF0ZVxuICAgIGVsLmRtb3ZlIHgsIHlcbiAgICBAXG5cbiAgZ2V0SGVpZ2h0OiAtPiBAX2VsLm5vZGUuZ2V0QkJveCgpLmhlaWdodFxuXG4gIHJlbmRlclRvOiAoQF9wYXJlbnRFbCkgLT5cbiAgICBAX2VsID0gQF9jcmVhdGVFbCgpLmFkZENsYXNzKEBfX3Byb3RvX18uY29uc3RydWN0b3IubmFtZSlcblxuICBfY3JlYXRlRWw6IC0+IEBfcGFyZW50RWwuZ3JvdXAoKVxuXG4gIHZpc2libGU6IC0+IEBfZWwudmlzaWJsZSgpXG4gIHNob3c6IC0+IEBfZWwuc2hvdygpXG4gIGhpZGU6IC0+IEBfZWwuaGlkZSgpXG4gIHRvZ2dsZTogLT4gaWYgQHZpc2libGUoKSB0aGVuIEBoaWRlKCkgZWxzZSBAc2hvdygpXG5cbiAgZmFkZUluOiAoY2IpIC0+XG4gICAgQF9lbC5zaG93KClcbiAgICAjIFRoaXMgaGFjayBpcyBuZWVkZWQgZm9yIGFuaW1hdGlvbiB0byB3b3JrXG4gICAgc2V0VGltZW91dCA9PlxuICAgICAgQF9hbmltYXRlKEBfZWwsIHRydWUpLm9wYWNpdHkoMSkuYWZ0ZXIgPT5cbiAgICAgICAgY2IoKSBpZiBjYlxuICAgICwgMFxuXG4gIGZhZGVPdXQ6IChjYikgLT5cbiAgICBAX2FuaW1hdGUoQF9lbCwgdHJ1ZSkub3BhY2l0eSgwKS5hZnRlciA9PlxuICAgICAgQF9lbC5oaWRlKClcbiAgICAgIGNiKCkgaWYgY2JcblxuICBmYWRlVG9nZ2xlOiAoY2IpIC0+XG4gICAgaWYgQHZpc2libGUoKVxuICAgICAgQGZhZGVPdXQoY2IpXG4gICAgZWxzZVxuICAgICAgQGZhZGVJbigpXG4gICAgICBjYigpIGlmIGNiXG5cbiAgaWdub3JlSGVpZ2h0OiAtPiBAb3B0aW9ucy5pZ25vcmVIZWlnaHQgb3Igbm90IEB2aXNpYmxlKClcblxuICBfYW5pbWF0ZTogKHN2ZywgYW5pbWF0ZSkgLT5cbiAgICBpZiBhbmltYXRlIHRoZW4gc3ZnLmFuaW1hdGUoQG9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb24pIGVsc2Ugc3ZnXG5cbiAgIyBFdmVudHNcbiAgb25IZWlnaHRDaGFuZ2VkOiAoY2IpIC0+XG4gICAgQF9faGVpZ2h0Q2hhbmdlZENhbGxiYWNrcy5wdXNoIGNiXG5cbiAgX2ZpcmVIZWlnaHRDaGFuZ2VkOiAtPlxuICAgIGNiIEAsIEBnZXRIZWlnaHQoKSBmb3IgY2IgaW4gQF9faGVpZ2h0Q2hhbmdlZENhbGxiYWNrc1xuIl19