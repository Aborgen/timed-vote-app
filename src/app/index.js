import React                 from 'react';
import ReactDOM              from 'react-dom';
import { Provider }          from 'react-redux';
import { createStore }       from 'redux';
import { BrowserRouter }     from 'react-router-dom';
import io                    from 'socket.io-client'
import registerServiceWorker from './registerServiceWorker';

import App                   from './App';
import reducer               from './Reducers/reducer';

const store  = createStore(reducer);
const socket = io("http://localhost:8080");
socket.on('state', (state) =>{
    store.dispatch({ type: 'SET_STATE', state });
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);

registerServiceWorker();
