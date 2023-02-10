const gulp = require("gulp");
const replace = require("gulp-replace");
const argv = require("minimist")(process.argv.slice(2));

const SETTING_TAB_COUNTS = argv.tabs || 10;
const SETTING_METHOD = argv.method || "scriptingAPI";
const SETTING_TIME = argv.timeMinutes || 2;

//--tabs=10 --method=scriptingAPI --timeMinutes=2

gulp.task("build-extension", () => {
    return gulp.src("src/*")
        .pipe(replace('{{TAB_COUNT_PLACEHOLDER}}', SETTING_TAB_COUNTS))
        .pipe(replace('{{METHOD_PLACEHOLDER}}', SETTING_METHOD))
        .pipe(replace('{{TIME_PLACEHOLDER}}', SETTING_TIME))
        .pipe(gulp.dest(`dest`));
});