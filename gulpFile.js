var gulp 		 = require('gulp'),
	sass 		 = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat 		 = require('gulp-concat'),
	uglify		 = require('gulp-uglify-es').default,
	cssnano 	 = require('gulp-cssnano'),
	rename 		 = require('rename'),
	del 		 = require('del'),
	imagemin 	 = require('gulp-imagemin'),
	pngQuant	 = require('imagemin-pngquant'),
	cache 		 = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');
	//gutil 		 = require('gulp-util'),
	//ftp			 = require('vinyl-ftp');

// преобразование SASS --> CSS, автопрефиксы css + перезагрузка страницы по окончанию
gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.+(scss|sass)') // исходный файл (файлы)
	.pipe( sass() ) // преобразования с помощью saas плагина в css файл
	.pipe( autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true}) )
	.pipe( gulp.dest('app/css') ) // куда положить (без имени файла, только папка)
	.pipe( browserSync.reload({stream: true}) ); // reload с помощью browserSync
});

// соединение и минификация библиотек js скриптов
gulp.task('scripts-min', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'app/libs/bootstrap/dist/js/bootstrap.min.js',
		'app/libs/wow/dist/wow.min.js',
		'app/libs/slick-carousel/slick/slick.min.js'
		])
	.pipe( concat('libs.min.js') )
	.pipe( uglify() )
	.pipe( gulp.dest('app/js') );
});

// сжатие css файлов библиотек
gulp.task('css-libs-min', ['sass'], function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	//.pipe( rename({suffix: ".min"}) )
	.pipe( gulp.dest('app/css/') );
});

// добавляет локальный сервер и автообновление
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

// крутое сжатие изображений, проходит тесты google=)
gulp.task('min-image', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svoPlugins: [{removeViewBox: false}],
		une: [pngQuant()]
	})))
	.pipe(gulp.dest('dist/img'));
});


///////////////////////////////////////////////////////////////////////////////////////
// автообновление страницы
gulp.task('watch', ['browser-sync', 'sass', 'scripts-min', 'css-libs-min'], function(){ // параметры в квадратных скобках выполняются до watch
	gulp.watch('app/img/**/*', browserSync.reload);
	gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});
///////////////////////////////////////////////////////////////////////////////////////

// отчищает папку продакшена перед новым билдом
gulp.task('clean-dist', function(){
	return del.sync('dist');
});

// использую для отчистки кэша, если файлы были перенесены в другое место
gulp.task('clear-cash', function(){
	return cache.clearAll();
});

// building prodaction project
gulp.task('build', ['clean-dist', 'min-image', 'sass', 'scripts-min'], function(){
	var buildCss = gulp.src('app/css/**/*.css')
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*.js')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
});

// заливаем на ftp
/*gulp.task( 'deploy', function () {
 
    var conn = ftp.create( {
        host:     'mywebsite.tld',
        user:     'me',
        password: 'mypass',
        parallel: 10,
        log:      gutil.log
    } );
 
    var globs = [
        'src/**',
        'css/**',
        'js/**',
        'fonts/**',
        'index.html'
    ];
 
    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance
 
    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( '/public_html' ) ) // only upload newer files
        .pipe( conn.dest( '/public_html' ) );
 
} );*/