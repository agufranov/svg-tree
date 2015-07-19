gulp = require 'gulp'
browserSync = require('browser-sync').create()
reload = browserSync.reload
path = require 'path'

gulpDeps = ['watch', 'coffee', 'jade', 'stylus', 'sourcemaps', 'clean', 'debug', 'util', 'notify', 'plumber', 'concat']

gulpDeps.forEach (dep) -> eval "#{dep} = require('gulp-#{dep}')" # require each dep



gulp.task 'default', ['watch', 'copy-lib', 'browser-sync']

gulp.task 'watch', ['watch-coffee', 'watch-jade', 'watch-stylus']

gulp.task 'concat', ['concat-compile', 'concat-concat'], ->
  gulp.src 'concat'
    .pipe clean()
  console.log 'done'

gulp.task 'concat-compile', ->
  gulp.src 'src/**/*.coffee'
    .pipe coffee bare: true
    .pipe gulp.dest 'concat'

gulp.task 'concat-concat', ->
  gulp.src [
    'concat/classes/stackElement.js'
    'concat/classes/stackHtmlElement.js'
    'concat/classes/stackAbstractContainer.js'
    'concat/classes/stackContainer.js'
    'concat/classes/stackRoot.js'
    'concat/classes/stackHorizontalContainer.js'
    'concat/classes/stackHtmlDepElement.js'
    'concat/classes/tree/stackHtmlElementWithCollapser.js'
    'concat/classes/tree/stackTreeContainer.js'
    'concat/classes/tree/structureTree.js'
    'concat/classes/tree/structureTreeArrow.js'
    'concat/classes/tree/structureTreeUnbindedX.js'
    'concat/classes/tree/structureTreeFactory.js'
  ]
    .pipe concat 'svgTree.js'
    .pipe gulp.dest '/home/anthrax/dev/vermilion/vermilion/ui/client/vendor/'

gulp.task 'watch-coffee', ->
  gulp.src 'src/**/*.coffee'
    .pipe watch 'src/**/*.coffee', verbose: true, name: 'Coffee'
    .pipe plumber(errorHandler: coffeeErrorHandler)
    .pipe sourcemaps.init()
    .pipe(coffee(bare: true))
    .pipe sourcemaps.write()
    .pipe gulp.dest 'build'
    .pipe reload stream: true

gulp.task 'watch-jade', ->
  gulp.src 'src/**/*.jade'
    .pipe watch 'src/**/*.jade', verbose: true, name: 'Jade'
    .pipe jade(pretty: true)
    .pipe gulp.dest 'build'
    .pipe reload stream: true

gulp.task 'watch-stylus', ->
  gulp.src 'src/**/*.styl'
    .pipe watch 'src/**/*.styl', verbose: true, name: 'Stylus'
    .pipe sourcemaps.init()
    .pipe stylus()
    .pipe sourcemaps.write()
    .pipe gulp.dest 'build'
    .pipe reload stream: true

gulp.task 'copy-lib', ->
  gulp.src 'lib/**'
    .pipe gulp.dest 'build'

gulp.task 'browser-sync', ->
  browserSync.init
        server:
          baseDir: 'build'

gulp.task 'clean', ->
  gulp.src 'build', read: false
    .pipe clean()

coffeeErrorHandler = (err) ->
  console.log err.toString()
  notify.onError(
    title:  "Compilation error [#{err.message}]"
    subtitle: 'Failure'
    message: "#{path.relative(process.cwd(), err.filename or err.path)}:#{err.location.first_line}"
    sound: 'Beep'
    onLast: true
  )(err)
