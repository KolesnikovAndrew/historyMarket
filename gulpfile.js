// dependencies
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const rename = require("gulp-rename");

//Func
function compilescss() {
  return src("./src/scss/style.scss")
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(
      rename((path) => {
        return {
          dirname: path.dirname + "",
          basename: path.basename + ".min",
          extname: ".css",
        };
      })
    )
    .pipe(dest("./dist/css"));
}

function compilegifs() {
  return src("src/images/**").pipe(dest("./dist/images/"));
}
function compilehtml() {
  return src("src/index.html").pipe(dest("./dist/"));
}
//watchtask
const watchTask = () => {
  watch("./src/scss/*.scss", compilescss);
  watch("src/images/**", compilegifs);
  watch("src/index.html", compilehtml);
};
//def task
exports.default = series(compilescss, compilegifs, compilehtml, watchTask);
