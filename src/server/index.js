import makeStore   from './store';
import reducer     from './reducer';
import startServer from './server';
import candidates  from './config/candidates.json';
import config      from './config/config.json'

const port         = config['port'];
const n            = config['bracketSize'];
export const store = makeStore(reducer);
startServer(store, port);

store.dispatch({
    type: 'SET_ENTRIES',
    entries: candidates['entries']
});
store.dispatch({ type: 'CURRENT_VOTE', n })
