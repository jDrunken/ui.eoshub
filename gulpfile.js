var gulp = require('gulp')

    // server + live-reload
	connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),

    // task run sequancial
    runSequence = require('run-sequence'),

    // clean before running
    clean = require('del'),

    // styling
	sass = require('gulp-sass'),

    // source tracking
	sourcemaps = require('gulp-sourcemaps'),

    // html template
    extender = require('gulp-html-extend'),

    // comment remove
    removeHtmlComment = require('gulp-remove-html-comments')

    // 루트에 간추린 파일을 만듬
    makeIndex    = require('gulp-index'),

    // gulp-gh-pages
    publish = require('gulp-gh-pages')
;


// 환경설정
var path = {
    source : {
        root     : 'src',
        style    : 'src/stylesheets',
        js       : 'src/js',
        template : 'src',
        image    : 'src/image',
        conf     : 'src/conf',
        html     : 'src/html'
    },
    deploy : 'deploy'
};


//  도움말
gulp.task('help',function () {
    var comment = `
elm 파 볼 시간이 안되서 미리 만드는 eoshub UI 전용 저장소입니다.

# 환경설정

> npm install gulp -g

전역으로 gulp 설치가 완료되고 나면 사전 정의된 각종 플러그인을 설치합니다.

> npm install --save

설치가 마무리되면 아래처럼 명령어를 실행합니다.

# 실행

로컬에서 실행해볼떄
> gulp local

자세한 사항은 없습니다.
    `;
    
    console.log(comment);
});



// --------------------------------------------------------------------------------
// task running 설정
// --------------------------------------------------------------------------------

// index 파일 자동 생성
var buildIndexHtmlOption = require('./build-index-option.js');      // 설정파일 로딩
gulp.task('make:index.html', function () {
    return gulp.src([
        path.source.html + '/**/*.html',    // 전체를 포함
        '!**/_common/**',     // 공통파일은 포함하지 않음.
        '!**/@snippet/**',    // 조각파일도 포함하지 않음.
        '!**/_resource/**',    // 로컬 리소스 폴더도 포함하지 않음.
        '!**/template/**',    // 로컬 리소스 폴더도 포함하지 않음.
        '!**/index.html'      // index 파일도 포함하지 않음.
    ])
    .pipe(makeIndex(buildIndexHtmlOption))
    .pipe(gulp.dest(path.deploy));
});


// 로컬 서버 설정 :: host 설정 해주지 않으면 외부에서 보이질 않는구나. 
gulp.task('connect', function() {
	connect.server({
		root: path.deploy,
		port : 3040,
		livereload: true,
        directory:true,
        host:'0.0.0.0'
	});
});

// 파일 변경 감지 :: local
gulp.task('watch', function(callback) {
    livereload.listen();
    gulp.watch(path.source.style+'/*.{scss,sass,css}',['convert:sass:sourcemap'],callback);

    // index 재생성
    gulp.watch(path.source.html+'/**/*.html', ['make:index.html'],callback);

    // 탬플릿은 세밀하게 지정해줘야 될지도...
    gulp.watch([
        path.source.template+'/**/*.html',
        path.source.html+'/**/*.html',
    ], ['html'],callback);

    // 이미지 수정처3
    gulp.watch(path.source.image+'/*.{png,jpg,gif,svg}', ['copy:image'],callback);
});

// 빌드 전 청소
gulp.task('clean',function () {
	return clean(path.deploy);
});

// scss 변환 :: local
gulp.task('convert:sass:sourcemap', function () {

    return gulp.src(path.source.style + '/**/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.deploy + '/css'))
        .pipe(livereload());
});


// html 처리
gulp.task('html',function () {
    return gulp.src(path.source.html + '/**/*.html')
        .pipe(extender({
            annotations: false,
            verbose: false
        })) // default options
        .pipe(removeHtmlComment())
        .pipe(gulp.dest(path.deploy))
        .pipe(livereload());
});


// image :: local, copy
gulp.task('copy:image', function () {
    return gulp.src(path.source.image + '/*.{jpg,png,gif,svg}')
        .pipe(gulp.dest(path.deploy + '/image'))
        .pipe(livereload());
});


// conference file copy :: local, deploy 공통
gulp.task('copy:conf',function () {
    return gulp.src(path.source.conf + '/*')
        .pipe(gulp.dest(path.deploy))
        .pipe(livereload());
});

// 배포
gulp.task('release', function () {
    return gulp.src(path.deploy + '/**/*')
        .pipe(publish({
            force : true,
            message : 'eoshub :: 깃허브 페이지에 반영됨. Published to Github pages'
        }))
});

// --------------------------------------------------------------------------------
// pipe running
// --------------------------------------------------------------------------------

// gulp.task('default', ['help']);
// 여기서 running task는 gulp밖에 없으니깐..
gulp.task('default', ['local']);

gulp.task('local', function () {
    runSequence('clean','make:index.html',['copy:image','copy:conf'],'convert:sass:sourcemap', 'html',['connect','watch']);
});

gulp.task('deploy', function () {
    runSequence('clean','make:index.html',['copy:image','copy:conf'],'convert:sass:sourcemap', 'html','release');
});


