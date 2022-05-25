const fs = require('fs');
const path = require('path');

const dirProject = path.join(__dirname, 'project-dist');
const dirStyles = path.join(__dirname, 'styles');

fs.rm(dirProject, { recursive: true, force: true }, ((err) => {
  if (err) throw err;
  fs.mkdir(dirProject, { recursive: true }, ((err) => {
    if (err) throw err;
    fs.rm(path.join(dirProject, 'assets'), { recursive: true, force: true }, ((err) => {
      if (err) throw err;
      fs.mkdir(path.join(dirProject, 'assets'), { recursive: true }, ((err) => {
        if (err) throw err;
        fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, ((err, itemList) => {
          if (err) throw err;      
          itemList.forEach(item => {
            if (item.isDirectory()){
              fs.mkdir(path.join(dirProject, 'assets', item.name), { recursive: true }, ((err) => {
                if (err) throw err;
                fs.readdir(path.join(__dirname, 'assets', item.name),  {withFileTypes: true}, ((err, fileList) => {
                  if (err) throw err;
                  fileList.forEach(file => {
                    fs.copyFile(path.join(__dirname, 'assets', item.name, file.name), path.join(dirProject, 'assets', item.name, file.name), ((err) => {
                      if (err) throw err;  
                      fs.writeFile(path.join(dirProject, 'style.css'), '', (err) => {
                        if (err) throw err;
                        fs.readdir(dirStyles, {withFileTypes: true}, ((err, fileList) => {
                          if (err) throw err;
                          fileList.forEach(item => {
                            if (item.isFile()) {
                              let fullName = item.name;
                              let fExt = fullName.split('.')[1];
                              if (fExt === 'css') {
                                fs.readFile(path.join(dirStyles, fullName), 'utf-8', (err, style) => {
                                  if (err) throw err;
                                  fs.appendFile(path.join(dirProject, 'style.css'), style, (err) => {
                                    if (err) throw err;   
                                    fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, ((err, fileList) => {
                                      if (err) throw err;
                                      fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
                                        if (err) throw err;
                                        let template = data;
                                        for (item of fileList) {
                                          let fileName = item.name.split('.')[0];
                                          fs.readFile(path.join(__dirname, 'components', item.name), 'utf-8', (err, cont) => {
                                            if (err) throw err;
                                            template = template.replace(`{{${fileName}}}`, cont);                                              
                                            fs.writeFile(path.join(dirProject, 'index.html'), template, (err) => {
                                              if (err) throw err;
                                            });       
                                          });  
                                        }
                                      });  
                                    }));
                                  });
                                });
                              }      
                            }
                          });  
                        }));
                      });
                    }));    
                  });
                }));
              }));
            }    
          });  
        }));
      }));
    }));
  }));
}));