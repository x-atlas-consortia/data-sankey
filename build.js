// The is run whenever the build via npm run dist is executed.

// import * as fs from 'fs'
const fs = require('node:fs')
const { build } = require('esbuild');
const { dependencies, peerDependencies } = require('./package.json');
const glob = require('glob');
const path = require('path');

const libPath = 'src/lib/'
const entryPoints = glob.sync(path.join(process.cwd(), libPath + '/**/*.js'));

fs.readFile('./package.json', function(err, data) {

    if (err) return;

    const pkg = JSON.parse(data);
    let bannerContent = `/** ${(new Date()).toLocaleString()} | ${pkg.description} ${pkg.version} | ${pkg.repository.url} | Pitt DBMI CODCC **/`
   
    const sharedConfig = {
        entryPoints: entryPoints,
        bundle: true,
        minify: true,
        banner: {
            js: bannerContent,
            css: bannerContent,
        },
        // Exclude dependencies from the bundle so consumers install them separately
        external: Object.keys(dependencies || {}).concat(Object.keys(peerDependencies || {})),
    };

    function copyFile(file) {
        fs.copyFile(`./${libPath}${file}`, `./dist/${file}`, (err) => {
            if (err) throw err;
        });
    }

    build({
        ...sharedConfig,
        format: 'esm',
        outdir: 'dist',
    }).catch(() => process.exit(1));

    setTimeout(() => {
        const allFiles = fs.readdirSync(libPath)
        const files = allFiles.filter((f) => ['.css', '.html'].includes(path.extname(f)))
        files.map((f) => copyFile(f))
    }, 1000)
    
    
});










