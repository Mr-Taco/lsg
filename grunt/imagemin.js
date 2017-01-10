var mozjpeg = require('imagemin-mozjpeg');

module.exports = {
    minify: {
        options: {
            optimizationLevel: 3,
            svgoPlugins: [{ removeViewBox: false }],
            use: []
        },
        files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: 'public/assets/images',                   // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif,svg}'],   // Actual patterns to match
            dest: 'tmp/'                  // Destination path prefix
        }]
    }
};
