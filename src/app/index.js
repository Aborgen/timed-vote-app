import React                 from 'react';
import ReactDOM              from 'react-dom';
import { Provider } from 'react-redux';
import { createStore }       from 'redux';
import { BrowserRouter }     from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App                   from './App';
import reducer               from './Reducers/reducer';

const store = createStore(reducer);
store.dispatch({
    type: 'SET_STATE',
    state: {
        ballot: {
            candidates: ['SUPERHOT', 'Superflight', 'Valley'],
            votes: {
                'SUPERHOT': 3,
                'Superflight': 3
            }
        }
    }
});
const mapStateToProps = (state) => {
    return {
        candidates: state.getIn(['ballot', 'candidates']),
        results: state.results
    };
};

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App mapState={mapStateToProps} />
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);

registerServiceWorker();
