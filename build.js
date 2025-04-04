// The is run whenever the build via npm run dist is executed.

const fs = require('node:fs');
fs.readFile('./package.json', function(err, data) {

    if (err) return;

    const pkg = JSON.parse(data);
    let content = `${(new Date()).toLocaleString()} | ${pkg.description} ${pkg.version} | ${pkg.repository.url} | Pitt DBMI CODCC`
    fs.writeFile('./build.txt', content, err => {})
});