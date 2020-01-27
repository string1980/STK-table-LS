const concat = require('concat');

(async function build() {
  const files = [
    './dist/pnpjsAngularelement/runtime.js',
    './dist/pnpjsAngularelement/polyfills.js',
    './dist/pnpjsAngularelement/scripts.js',
    './dist/pnpjsAngularelement/main.js'
  ];
  await concat(files, './dist/pnpjsAngularelement/bundle.js');
})();
