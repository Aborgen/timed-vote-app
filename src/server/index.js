import makeStore   from './store';
import reducer     from './reducer';
import startServer from './server';
import candidates  from './config/candidates.json';

export const store = makeStore(reducer);
startServer(store, 8080);

store.dispatch({
    type: 'SET_ENTRIES',
    entries: candidates['entries']
});
store.dispatch({type: 'NEXT'})
