import makeStore   from './store';
import reducer     from './reducer';
import startServer from './server';
import text     from './text.json';

export const store = makeStore(reducer);
startServer(store, 8080);

store.dispatch({
    type: 'SET_ENTRIES',
    entries: text['entries']
});
store.dispatch({type: 'NEXT'})
