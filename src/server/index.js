import makeStore   from './Redux/store';
import reducer     from './Redux/reducer';
import startServer from './server';
import candidates  from './config/candidates.json';
import config      from './config/config.json'

const port         = config['port'];
export const store = makeStore(reducer);
startServer(store, 8080);

store.dispatch({
    type: 'SET_ENTRIES',
    entries: candidates['entries']
});
store.dispatch({ type: 'CURRENT_VOTE' })
