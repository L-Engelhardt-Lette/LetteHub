const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');

fs.rm(distPath, { recursive: true, force: true }, (err) => {
  if (err) {
    throw err;
  }
  console.log('dist folder cleaned');
});
