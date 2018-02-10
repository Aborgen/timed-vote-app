import { Map } from 'immutable';

import { INITAL_STATE } from '../../server/core';

function setState(state, newState) {
    return state.merge(newState);
}

export default function reducer(state = INITAL_STATE, action) {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state)
        default:
            return state
    }
}
