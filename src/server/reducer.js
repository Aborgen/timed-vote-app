import { INITAL_STATE, setEntries, currentVote, vote } from './core';

export default function reducer(state = INITAL_STATE, action) {
    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'CURRENT_VOTE':
            return currentVote(state, action.n);
        case 'VOTE':
            return state.update('ballot',
                (voteState) => vote(voteState, action.entry));
        default:
            return state;
    };
}
