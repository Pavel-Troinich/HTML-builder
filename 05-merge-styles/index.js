const fs = require('fs');
const path = require('path');
const dirDest = path.join(__dirname, 'project-dist');
const dirSrc = path.join(__dirname, 'styles');

fs.writeFile(path.join(dirDest, 'bundle.css'), '',
  (err) => {
    if (err) throw err;
    console.log(dirDest); 
  }
);

fs.readdir(dirSrc, {withFileTypes: true}, ((err, fileList) => {
  if (err) throw err;
  fileList.forEach(item => {
    if (item.isFile()) {
      let fullName = item.name;
      let fExt = fullName.split('.')[1];
      if (fExt === 'css') {
        fs.readFile(
          path.join(dirSrc, fullName),
          'utf-8',
          (err, data) => {
            if (err) throw err;
            fs.appendFile(
              path.join(dirDest, 'bundle.css'), data,
              (err) => {
                if (err) throw err;      
              }
            );
          }
        );
      }      
    }
  });  
}));