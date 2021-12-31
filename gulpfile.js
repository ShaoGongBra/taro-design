const gulp = require('gulp')
const typedoc = require("gulp-typedoc");

gulp.task("typedoc", function () {
  return gulp.src(["index.d.ts"]).pipe(
    typedoc({
      out: "./docs/",
      name: "TaroDesign",
      categorizeByGroup: false,
      disableSources: true,
      hideGenerator: true
    })
  );
});
