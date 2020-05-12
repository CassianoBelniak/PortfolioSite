const path = require('path');
const pug = require('pug');
const glob = require("glob");
const fs = require('fs');

async function make(){
    var paths = await getPugFiles();
    for await (file of paths){
        var html = pug.renderFile(file);
        var relativePath = path.relative(path.join(__dirname, '/src'), file);
        var pos = relativePath.lastIndexOf(".");
        relativePath = relativePath.substr(0, pos < 0 ? relativePath.length : pos) + ".html";
        fs.writeFile(path.join(__dirname, '/public', relativePath), html, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Generated " + relativePath + " file");
        });
    }
}

async function getPugFiles(){
    var promise = new Promise(resolve=>{
    var getDirectories = function (src, callback) {
        glob(path.join(__dirname, '/src/*.pug'), callback);
      };
      getDirectories('test', function (err, res) {
        if (err) {
          console.log('Error', err);
        } else {
            resolve(res);
        }
      });
    });
    return await promise;
}

module.exports = make;