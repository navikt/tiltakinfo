const fs = require('fs');
const path = require('path');

function readFile(dir, file) {
    try {
        return fs.readFileSync(path.join(dir, file), 'utf8');
    } catch(e) {
        console.log('Error:', e.stack);
    }
}

function createJson(katalog) {
    return '/* tslint:disable:max-line-length */\nexport default {' + read(katalog) + '\n};';
}

const read = (dir) =>
    fs.readdirSync(dir)
        .reduce((files, file) =>
            fs.statSync(path.join(dir, file)).isDirectory() ?
                files.concat(read(path.join(dir, file))) :
                files.concat(
                    "\n    '" + file.split('.')[0] + "'" + ': ' + "'" + readFile(dir, file).trim() + "'"
                ), []);

const teksterDir = './src/tekster';

try{
    fs.writeFileSync('./src/tekster-generering/alle-tekster.ts', createJson(teksterDir));
}catch (e){
    console.log("Kunne ikke skrive fil ", e);
}
