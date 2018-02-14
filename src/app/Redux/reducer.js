
import { INITAL_STATE } from '../../server/Redux/core';

function setState(state, newState, maybeResetVote) {
    return maybeResetVote(state.merge(newState));
}

function vote(state, candidate) {
    const candidates = state.getIn(['ballot', 'candidates']);
    return candidates && candidates.includes(candidate)
        ? state.set('hasVoted', candidate)
        : state;
}

function maybeResetVote(state) {
    const hasVoted   = state.get('hasVoted');
    const candidates = state.getIn(['ballot', 'candidates']);
    return hasVoted && !candidates.includes(hasVoted)
        ? state.remove('hasVoted')
        : state;
}

export default function reducer(state = INITAL_STATE, action) {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state, maybeResetVote);
        case 'VOTE':
            return vote(state, action.candidate);
        default:
            return state;
    }
}
