const { JSDOM } = require('jsdom');
const { readFileSync } = require('fs');


const mediumZoomPlugin = async (html, route) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  makeImageMediumZoom(doc);

  doc.body.append(loadMediumZoom(doc));
  doc.body.append(createMediumZoomScript(doc));

  return dom.serialize();
};

const getConfig = () => {
  try{
    const configFile = readFileSync(
      `${process.cwd()}/medium-zoom.config.json`,
      'utf8'
    );
    return configFile.toString();
  }catch(err){
    return '{}'
  }

}

const makeImageMediumZoom = (doc) => {
  var imgEl = doc.getElementsByTagName('img');

  for (var i = 0; i < imgEl.length; i++) {
    imgEl[i].setAttribute('data-zoomable', true);
  }
};

const loadMediumZoom = (doc) => {
  const mediumZoom = doc.createElement('script');
  mediumZoom.src =
    'https://cdn.jsdelivr.net/npm/medium-zoom@1.0.6/dist/medium-zoom.min.js';
  return mediumZoom;
};

const createMediumZoomScript = (doc) => {
  const script = doc.createElement('script');
  const config = getConfig(); 
  script.innerHTML = `
    window.addEventListener('AngularReady', mediumZoomScript);
    function mediumZoomScript(){
      mediumZoom('[data-zoomable]',${config});
    }
    `;
  return script;
};

module.exports = {
  mediumZoomPlugin,
};
