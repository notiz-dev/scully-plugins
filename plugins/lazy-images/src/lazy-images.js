const { JSDOM } = require('jsdom');
const { get } = require('axios');
var sizeOf = require('image-size');
const { scullyConfig } = require('@scullyio/scully');
const path = require('path');

const lazyImagesPlugin = async (html, route) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  await makeImageLazyload(doc, route);

  doc.body.append(loadLazyload(doc));
  doc.body.append(createLazyImageScript(doc));

  return dom.serialize();
};

const makeImageLazyload = async (doc, route) => {
  var imgEl = doc.getElementsByTagName('img');

  // can be added when loading="lazy" is supported in more browsers
  //   for (var i = 0; i < imgEl.length; i++) {
  //     imgEl[i].setAttribute('loading', 'lazy');
  //   }

  for (var i = 0; i < imgEl.length; i++) {
    if (imgEl[i].getAttribute('src')) {
      if (imgEl[i].getAttribute('src').startsWith('http')) {
        const image = await get(imgEl[i].getAttribute('src'), {
          responseType: 'arraybuffer',
        });
        const dimensions = sizeOf(image.data);
        imgEl[i].setAttribute('height', dimensions.height);
        imgEl[i].setAttribute('width', dimensions.width);
      } else {
        const dimensions = sizeOf(
          path.join(scullyConfig.outDir, imgEl[i].getAttribute('src'))
        );
        imgEl[i].setAttribute('height', dimensions.height);
        imgEl[i].setAttribute('width', dimensions.width);
      }
      imgEl[i].setAttribute('data-src', imgEl[i].getAttribute('src'));
      imgEl[i].removeAttribute('src');
      imgEl[i].classList.add('lazyload');
    }
  }
};

const loadLazyload = (doc) => {
  const lazyload = doc.createElement('script');
  lazyload.src = 'https://cdn.jsdelivr.net/npm/lazyload@2.0.0-rc.2/lazyload.js';
  return lazyload;
};

const createLazyImageScript = (doc) => {
  const script = doc.createElement('script');
  script.innerHTML = `
    window.addEventListener('AngularReady', lazyloadScript); // also gets triggered after navigation content load
    function lazyloadScript(){
      lazyload();
    }
    `;
  return script;
};

module.exports = {
  lazyImagesPlugin,
};
