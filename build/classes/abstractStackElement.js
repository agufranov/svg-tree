var AbstractStackElement;

AbstractStackElement = (function() {
  function AbstractStackElement() {}

  AbstractStackElement.prototype.renderTo = function(_parentEl) {
    this._parentEl = _parentEl;
  };

  AbstractStackElement.prototype.moveTo = function() {
    throw new Error('Not Implemented');
  };

  AbstractStackElement.prototype.getHeight = function() {
    throw new Error('Not Implemented');
  };

  AbstractStackElement.prototype._elFn = function() {
    throw new Error('Not Implemented');
  };

  return AbstractStackElement;

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvYWJzdHJhY3RTdGFja0VsZW1lbnQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQU07OztpQ0FFSixRQUFBLEdBQVUsU0FBQyxTQUFEO0lBQUMsSUFBQyxDQUFBLFlBQUQ7RUFBRDs7aUNBQ1YsTUFBQSxHQUFRLFNBQUE7QUFBRyxVQUFVLElBQUEsS0FBQSxDQUFNLGlCQUFOO0VBQWI7O2lDQUNSLFNBQUEsR0FBVyxTQUFBO0FBQUcsVUFBVSxJQUFBLEtBQUEsQ0FBTSxpQkFBTjtFQUFiOztpQ0FDWCxLQUFBLEdBQU8sU0FBQTtBQUFHLFVBQVUsSUFBQSxLQUFBLENBQU0saUJBQU47RUFBYiIsImZpbGUiOiJjbGFzc2VzL2Fic3RyYWN0U3RhY2tFbGVtZW50LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQWJzdHJhY3RTdGFja0VsZW1lbnRcblxuICByZW5kZXJUbzogKEBfcGFyZW50RWwpIC0+XG4gIG1vdmVUbzogLT4gdGhyb3cgbmV3IEVycm9yICdOb3QgSW1wbGVtZW50ZWQnXG4gIGdldEhlaWdodDogLT4gdGhyb3cgbmV3IEVycm9yICdOb3QgSW1wbGVtZW50ZWQnXG4gIF9lbEZuOiAtPiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBJbXBsZW1lbnRlZCdcbiJdfQ==