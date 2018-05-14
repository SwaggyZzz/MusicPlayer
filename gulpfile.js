var gulp = require("gulp");
var htmlclean = require("gulp-htmlclean"); // 代码压缩
var imagesmin = require("gulp-imagemin"); // 图片压缩
var uglify = require("gulp-uglify"); // js压缩
var stripdebug = require("gulp-strip-debug"); // 去掉js中的console,debugger等代码
var concat = require("gulp-concat"); // 将多个js文件合并为一个js文件 缺点按顺序合并 有些前面的js文件可能会用到后面的js文件从而报错
var deporder = require("gulp-deporder"); // 明确哪些js文件依赖于哪个js文件 在js文件中注释写上require('依赖的js文件')
var less = require("gulp-less"); // 将less转换为css
var postcss = require("gulp-postcss"); // 添加css前缀 压缩css等
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var connect = require("gulp-connect");

var folder = {
    src: "src/",
    dist: "dist/"
}

var devMode = process.env.NODE_ENV !== 'production'; // process是node里的一个变量 有production和dev两个状态
// export NODE_ENV=dev 改变状态 dev是开发状态 win 用set NODE_ENV=dev
// echo $NODE_ENV 查看当前状态 均在命令行操作


// gulp 流操作 先将文件变成文件流 就是一串二进制码 对二进制码进行压缩后 移到dist文件夹中生成新的压缩后的文件

// gulp.task('任务名',function(){} 对任务进行的操作)
// 在命令行使用 gulp 任务名 gulp html  执行任务操作
gulp.task("html",function () {
    var page = gulp.src(folder.src + "html/index.html") // html/* html文件夹下所有html文件
                   .pipe(connect.reload())
    if(!devMode){
        page.pipe(htmlclean())
    }
    page.pipe(gulp.dest(folder.dist + "html/"))
                    
})

gulp.task("images",function () {
    gulp.src(folder.src + "images/*") // 如果文件夹中有子文件夹 images/**/* 就可以选中所有
        .pipe(imagesmin())
        .pipe(gulp.dest(folder.dist + "images/"))
})

gulp.task("js",function () {
    var js = gulp.src(folder.src + "js/*")
                 .pipe(connect.reload())
    if(!devMode){
        // js.pipe(deporder())
        //   .pipe(concat("main.js"))
        js.pipe(uglify())
          .pipe(stripdebug())
    }
    js.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("css",function () {
    var css = gulp.src(folder.src + "css/*")
                  .pipe(connect.reload())
                  .pipe(less())
    var options = [autoprefixer()]
    if(!devMode){
        options.push(cssnano())
    }
    css.pipe(postcss(options))
       .pipe(gulp.dest(folder.dist + "css/"))
})

// 监听各个文件夹下文件的状态 如果更改就自动刷新 不用手动gulp
gulp.task("watch",function () {
    gulp.watch(folder.src + "html/*",["html"])
    gulp.watch(folder.src + "images/*", ["images"])
    gulp.watch(folder.src + "js/*", ["js"])
    gulp.watch(folder.src + "css/*", ["css"])
})

gulp.task("server",function () {
    connect.server({
        port: "8080", // 定义端口号
        livereload: true // 是否开启自动刷新
    });
})

// 直接在命令行中输入 gulp 就会先执行html任务再执行images任务再执行default,function是执行default的操作
// gulp.task("default",["html","images","js"],function () {
//     console.log(111)
// }) 
gulp.task("default", ["html", "images", "js","css","watch","server"]) 
