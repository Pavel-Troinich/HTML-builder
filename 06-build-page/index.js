const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

const dirProject = path.join(__dirname, 'project-dist');
const dirStyles = path.join(__dirname, 'styles');


async function htmlBuilder() {
  copyAssets();
  bundleCSS();
  createHtml();
}

initProject();


function initProject() {
  fs.rm(dirProject, { recursive: true, force: true }, ((err) => {
    if (err) throw err;
    fs.mkdir(dirProject, { recursive: true }, ((err) => {
      if (err) throw err;
      htmlBuilder();
    }));
  }));
}

function copyAssets() {
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
                }));
              });
            }));
          }));
        }
      });
    }));
  }));
}

function bundleCSS() {
  fs.writeFile(path.join(dirProject, 'style.css'), '', (err) => {
    if (err) throw err;
    fs.readdir(dirStyles, {withFileTypes: true}, ((err, fileList) => {
      if (err) throw err;
      for (let file of fileList) {
        let fullName = file.name;
        let fExt = fullName.split('.')[1];
        if (file.isFile() && fExt === 'css') {
          fs.readFile(path.join(dirStyles, fullName), 'utf-8', (err, style) => {
            if (err) throw err;
            fs.appendFile(path.join(dirProject, 'style.css'), style, (err) => {
              if (err) throw err;
            });
          });
        }
      }
    }));
  });
}

async function createHtml() {
  let template = await fsPromise.readFile(path.join(__dirname, 'template.html'));
  let components = await fsPromise.readdir(path.join(__dirname, 'components'), {withFileTypes: true});
  let html = template.toString();
  let currentPart = '';
  for (let component of components) {
    if (component.isFile() && path.extname(component.name) === '.html'){
      let fileName = component.name.split('.')[0];
      currentPart = await fsPromise.readFile(path.join(__dirname, 'components', component.name));
      html = html.replace(`{{${fileName}}}`, currentPart.toString());

    }
  }
  fsPromise.writeFile(path.join(dirProject, 'index.html'), html);
}