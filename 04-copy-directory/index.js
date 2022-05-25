const fs = require('fs');
const path = require('path');
const dirDest = path.join(__dirname, 'files-copy');
const dirFiles = path.join(__dirname, 'files');

fs.rm(dirDest, { recursive: true, force: true }, ((err) => {
  if (err) throw err;
  fs.mkdir(dirDest, { recursive: true }, ((err) => {
    if (err) throw err;
    fs.readdir(dirFiles, {withFileTypes: true}, ((err, fileList) => {
      if (err) throw err;
      let copyList = [];
      fileList.forEach(item => {
        copyList.push(item.name);    
      });
      copyList.forEach(file => {
        fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), ((err) => {
          if (err) throw err;    
        }));
      });
    }));
  }));
}));