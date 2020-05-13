const { JSDOM } = require('jsdom');

const foucPlugin = async (html, route) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  doc.body.classList.add('fouc');
  doc.head.append(createInvisibleStyle(doc));
  doc.body.append(createFoucScript(doc));

  return dom.serialize();
};

const createFoucScript = (doc) => {
  const script = doc.createElement('script');
  script.innerHTML = `
    window.addEventListener('AngularReady', foucScript);
    function foucScript(){
      document.body.classList.remove('fouc');
      window.removeEventListener('AngularReady', foucScript);
    }
    `;
  return script;
};

const createInvisibleStyle = (doc) => {
  const css = doc.createElement('style');
  css.innerHTML = `
    .fouc {
      visibility: hidden;
    }
  `;
  return css;
};

module.exports = {
  foucPlugin,
};
