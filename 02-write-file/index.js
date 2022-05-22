const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'mynotes.txt'), '',
  (err) => {
    if (err) throw err;  
  });

stdout.write('Привет! Напиши здесь что-нибудь:\n');

stdin.on('data', data => {
  let res = data.toString();
  if (res.trim() === 'exit') process.exit();
  fs.appendFile(
    path.join(__dirname, 'mynotes.txt'), res,
    (err) => {
      if (err) throw err;      
    }
  );
});

process.on('exit', () => stdout.write('Текст записан! Удачи в изучении Node.js!'));

process.on('SIGINT', () => process.exit());