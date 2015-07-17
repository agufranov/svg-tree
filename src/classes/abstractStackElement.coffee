class AbstractStackElement
  constructor: (@options = {}) ->
    _.defaults @options, @getDefaultOptions()

  getDefaultOptions: -> {}
  renderTo: (@_parentEl) ->
  moveTo: -> throw new Error 'Not Implemented'
  getHeight: -> throw new Error 'Not Implemented'
  _elFn: -> throw new Error 'Not Implemented'
