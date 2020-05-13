const { JSDOM } = require('jsdom');

const lazyImagesPlugin = async (html, route) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  makeImageLazyload(doc);

  doc.body.append(loadLazyload(doc));
  doc.body.append(createLazyImageScript(doc));

  return dom.serialize();
};

const makeImageLazyload = (doc) => {
  var imgEl = doc.getElementsByTagName('img');

  // can be added when loading="lazy" is supported in more browsers
  //   for (var i = 0; i < imgEl.length; i++) {
  //     imgEl[i].setAttribute('loading', 'lazy');
  //   }

  for (var i = 0; i < imgEl.length; i++) {
    if (imgEl[i].getAttribute('src')) {
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
    window.addEventListener('AngularReady', lazyloadScript);
    function lazyloadScript(){
      lazyload();
      window.removeEventListener('AngularReady', lazyloadScript);
    }
    `;
  return script;
};

module.exports = {
  lazyImagesPlugin,
};
