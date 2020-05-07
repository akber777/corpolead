// Include gulp
var gulp = require("gulp");

// Include Our Plugins
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var watch = require('gulp-watch');
var autoprefixer = require('autoprefixer-core');
var rigger = require('gulp-rigger');
var minify = require('gulp-minify');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename"); //minify elediyimiz dosyanın adını değiştirmek için kullandık bunu
var concat = require('gulp-concat'); //tüm js dosyalarını birleştirip all.js diye bir js dosyasında toplamak için
var flatten = require('gulp-flatten'); //fondaki klasör altında olan fontları tek klasöre toplamak için


var path = {
    build: { //Burada işlemden sonra bitmiş dosyaların nereye koyulacağını gösteriyoruz
        html: 'build/',
        js: 'build/js/',
        vendor: 'build/js/vendor/', //src deki vendor klasörünü buildeki vendor klasörüne eklemek için
        css: 'build/css/main/',
        images: 'build/img/',
        fonts: 'build/fonts/',
        libs: 'build/libs/' //bower ile src klasörüne yüklediğim dosyaları build klasörüne eklemek için
    },
    src: { //Burası kaynaklar
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main/**/*.js',
        vendor: 'src/js/vendor/*.js',
        css: 'src/css/main.scss',
        images: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        libs: 'src/libs/**/*.*'
    },
    watch: { //Burada izlemek istediğimiz dosyaları belirtiyoruz
        html: 'src/**/*.html',
        js: 'src/js/main/*.js',
        vendor: 'src/js/vendor/*.js',
        css: 'src/css/**/*.scss',
        images: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        libs: 'src/libs/**/*.*'
    },
};


gulp.task('html:build', async function () {
    gulp.src(path.src.html)
        .on('error', function (err) {
            console.log(err)
            this.emit('end')
        })
        .pipe(rigger()) //rigger ile dosyaları birleşdiriyoruz header footer gibi komponentleri import ediyoruz bir nevi
        .pipe(gulp.dest(path.build.html)); //Выплюнем их в папку build
});


gulp.task('js:build', async function () {
    gulp.src(path.src.js) //burdakileri al derle

        .pipe(concat('all.js'))
        .pipe(gulp.dest(path.build.js)) //minify etmeden all.js dosyasını ekledik aşağıdaki noSource: true  komutunu silersek buna gerek olmayacak sanırım denemedim ama mantık olarak o kod minify olunmamışını eklemesini engelliyor
        .pipe(minify({
            ext: {

                min: '.min.js'
            },
            noSource: true //bu build altındaki js klasörüne düşen index.js yi düşürmüyor sadece min olan düşüyor
        }))


        .pipe(gulp.dest(path.build.js)); //derlenmiş dosyayı buraya at
});


gulp.task('css:build', async function () {
    gulp.src(path.src.css) //Bizim main.scss seçer
        .pipe(sass()) //sass da derler
        .on('error', function (err) {
            console.log(err)
            this.emit('end')
        })
        .pipe(postcss([autoprefixer({browsers: ["> 0%"]})]))
        .pipe(gulp.dest(path.build.css))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css)); //build deki css e atar
});


gulp.task('image:build', async function () {
    gulp.src(path.src.images) //resimleri seçer
        .on('error', function (err) {
            console.log(err)
            this.emit('end')
        })
        .pipe(gulp.dest(path.build.images));
});

gulp.task('libs:build', async function () {
    gulp.src(path.src.libs)
        .on('error', function (err) {
            console.log(err)
            this.emit('end')
        })
        .pipe(gulp.dest(path.build.libs));
});


gulp.task('vendor:build', async function () {
    gulp.src(path.src.vendor)
        .on('error', function (err) {
            console.log(err)
            this.emit('end')
        })
        .pipe(gulp.dest(path.build.vendor));
});


gulp.task('fonts:build', async function () {
    gulp.src(path.src.fonts)
        .on('error', function (err) {
            console.log(err)
            this.emit('end')
        })
        .pipe(flatten())
        .pipe(gulp.dest(path.build.fonts))
});


gulp.task('build', gulp.series(
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'image:build',
    'libs:build',
    'vendor:build'
));


gulp.task('watch', function () {
    gulp.watch([path.watch.html], gulp.series('html:build')),
        gulp.watch([path.watch.css], gulp.series('css:build')),
        gulp.watch([path.watch.js], gulp.series('js:build')),
        gulp.watch([path.watch.images], gulp.series('image:build')),
        gulp.watch([path.watch.fonts], gulp.series('fonts:build')),
        gulp.watch([path.watch.libs], gulp.series('libs:build')),
        gulp.watch([path.watch.vendor], gulp.series('vendor:build'))
});


gulp.task('default', gulp.series('build', 'watch'))
