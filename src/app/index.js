import React                 from 'react';
import ReactDOM              from 'react-dom';
import { Provider }          from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter }     from 'react-router-dom';
import io                    from 'socket.io-client'
import registerServiceWorker from './registerServiceWorker';

import App                   from './App';
import { setState }          from './Redux/actionGen';
import reducer               from './Redux/reducer';
import remoteAction          from './Redux/Middleware/remoteAction';
import config                from '../server/config/config.json';

const socket = io(`http://localhost:${config['port']}`);
socket.on('state', (state) =>{
    store.dispatch(setState(state))
});
const middleware = applyMiddleware(remoteAction(socket))(createStore)
const store  = middleware(reducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);

registerServiceWorker();
