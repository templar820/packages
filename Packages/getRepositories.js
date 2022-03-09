const {execSync} = require("child_process");
const fs = require("fs");
const path = require("path")
const { resolve } = require('path');
const { readdir } = require('fs').promises;

async   function readDirectorySynchronously(directory, folder) {
    const currentDirectory = fs.readdirSync(directory, 'utf8');
    for (const file of currentDirectory) {
        const pathOfCurrentItem = path.join(directory, file);
        if (!fs.statSync(pathOfCurrentItem).isFile()) {
            const dir = `${directory }/${ file}`;
            readDirectorySynchronously(dir, file);
        }
        if (file.includes('package.json')) {
            const fileData = JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'));
            console.log(fileData.name);
        }
    }
}


readDirectorySynchronously("./verdaccio/storage")
