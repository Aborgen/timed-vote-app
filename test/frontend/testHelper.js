import chai          from 'chai';
import chaiImmutable from 'chai-immutable';
import { JSDOM }         from 'jsdom';

const doc = new JSDOM('<!DOCTYPE HTML><html><body></body</html>');
const win = doc.defaultView;
global.document = doc;
global.window   = win;
for(let key in win) {
    if(!(key in global)) {
        global[key] = win[key]
    }
};

// Allows chai to compare immutable data structures
chai.use(chaiImmutable);
