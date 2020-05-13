const { JSDOM } = require('jsdom');

const mediumZoomPlugin = async (html, route) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  makeImageMediumZoom(doc);

  doc.body.append(loadMediumZoom(doc));
  doc.body.append(createMediumZoomScript(doc));

  return dom.serialize();
};

const makeImageMediumZoom = (doc) => {
  var imgEl = doc.getElementsByTagName('img');

  for (var i = 0; i < imgEl.length; i++) {
    imgEl[i].setAttribute('data-zoomable', true);
  }
};

const loadMediumZoom = (doc) => {
  const mediumZoom = doc.createElement('script');
  mediumZoom.src =
    'https://cdn.jsdelivr.net/npm/medium-zoom@1.0.5/dist/medium-zoom.min.js';
  return mediumZoom;
};

const createMediumZoomScript = (doc) => {
  const script = doc.createElement('script');
  script.innerHTML = `
    window.addEventListener('AngularReady', mediumZoomScript);
    function mediumZoomScript(){
      mediumZoom('[data-zoomable]');
      window.removeEventListener('AngularReady', mediumZoomScript);
    }
    `;
  return script;
};

module.exports = {
  mediumZoomPlugin,
};
