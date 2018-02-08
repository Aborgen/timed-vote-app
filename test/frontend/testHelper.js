import chai          from 'chai';
import chaiImmutable from 'chai-immutable';
import { JSDOM }         from 'jsdom';

const doc = new JSDOM('<!DOCTYPE HTML><html><body></body</html>');
const win = doc.window;
global.document = win.document;
global.window   = win;
for(let key in window) {
    if(!(key in global)) {
        global[key] = window[key]
    }
};

// Allows chai to compare immutable data structures
chai.use(chaiImmutable);
