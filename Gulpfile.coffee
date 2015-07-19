gulp = require 'gulp'
browserSync = require('browser-sync').create()
reload = browserSync.reload
path = require 'path'

gulpDeps = ['watch', 'coffee', 'jade', 'stylus', 'sourcemaps', 'clean', 'debug', 'util', 'notify', 'plumber', 'concat']

gulpDeps.forEach (dep) -> eval "#{dep} = require('gulp-#{dep}')" # require each dep



gulp.task 'default', ['watch', 'copy-lib', 'browser-sync']

gulp.task 'watch', ['watch-coffee', 'watch-jade', 'watch-stylus']

gulp.task 'concat', ->
  gulp.src [
    'build/classes/stackElement.js'
    'build/classes/stackHtmlElement.js'
    'build/classes/stackAbstractContainer.js'
    'build/classes/stackContainer.js'
    'build/classes/stackRoot.js'
    'build/classes/stackHorizontalContainer.js'
    'build/classes/stackHtmlDepElement.js'
    'build/classes/tree/stackHtmlElementWithCollapser.js'
    'build/classes/tree/stackTreeContainer.js'
    'build/classes/tree/structureTree.js'
    'build/classes/tree/structureTreeArrow.js'
    'build/classes/tree/structureTreeUnbindedX.js'
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
