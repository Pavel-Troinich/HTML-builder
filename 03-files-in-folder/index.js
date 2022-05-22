const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, {withFileTypes: true}, ((err, fileList) => {
  if (err) throw err;
  
  fileList.forEach(item => {
    if (item.isFile()) {
      let fullName = item.name;
      let fName = fullName.split('.')[0];
      let fExt = fullName.split('.')[1];
      let fPath = `${dirPath}\\${fullName}`;
      let fSize = Number();
      fs.stat(fPath, (err, stats) => {
        if (err) throw err;
        fSize = (stats.size/1024).toFixed(2);
        console.log(`${fName} - ${fExt} - ${fSize} kb`);
      });
    }
  });
}));