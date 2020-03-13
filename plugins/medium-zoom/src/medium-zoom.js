const { JSDOM } = require('jsdom');

const mediumZoomPlugin = async (html, route) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  var imgEl = doc.getElementsByTagName('img');

  // can be added when loading="lazy" is supported in more browsers
  //   for (var i = 0; i < imgEl.length; i++) {
  //     imgEl[i].setAttribute('loading', 'lazy');
  //   }

  for (var i = 0; i < imgEl.length; i++) {
    imgEl[i].setAttribute('data-zoomable', true);
  }

  const lib = doc.createElement('script');
  lib.src =
    'https://cdn.jsdelivr.net/npm/medium-zoom@1.0.5/dist/medium-zoom.min.js';
  const s = doc.createElement('script');
  s.innerHTML = `
    (() => { 
      document.addEventListener('readystatechange',function(){
          if(document.readyState === 'complete'){
              setTimeout(() => {
                mediumZoom('[data-zoomable]');
              },0)
          }
      })
    })();
    `;
  doc.body.append(lib);
  doc.body.append(s);

  return dom.serialize();
};

module.exports = {
  mediumZoomPlugin
};
