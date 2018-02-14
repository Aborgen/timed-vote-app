import { List, Map } from 'immutable';
import config from '../config/config.json';

const bracketSize = config['bracketSize'];

function assignWinner(ballot) {
    if(!ballot) {
        return [];
    }
    // BARF. Very temporary, until I can wrap my head around this...
    const candidates = ballot.get('candidates');
    const bigNumba = candidates.map((candidate) => {
            return ballot.getIn(['votes', candidate], 0);
        }).max();
    const good = Map(candidates.map((candidate) => {
        return [ballot.getIn(['votes', candidate], 0), candidate];
    }));
    return good.get(bigNumba);

}

function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

function currentVote(state, n = bracketSize) {

    const entries = state.get('entries').concat(
        assignWinner(state.get('ballot'))
    );
    if(entries.size === 1) {
        const candidates = state.getIn(['ballot', 'candidates']);
        const winner = entries.first();
        const runnersUp = candidates.filter((candidate) => {
            return candidate !== winner ? candidate : ''
        });
        return state.remove('ballot')
                    .remove('entries')
                    .set('results', Map({ winner, runnersUp }), 0)
    }

    const candidates  = entries.take(n);
    const nextEntries = entries.skip(n);
    return state.merge({
        ballot: Map({ candidates }),
        entries: nextEntries
    });
}

function vote(state, entry) {
    return state.updateIn(
        ['ballot', 'votes', entry],
        0,
        (votes) => votes + 1
    );
}

export { setEntries, currentVote, vote };
export const INITAL_STATE = Map();
// export function init(bracketLength = 2, timeLimit = 43200000 /*12 hrs in ms*/) {
//     const state   = setEntries(getEntries());
//     const ballots = state.get('entries').size / bracketLength
//     const byes    = ballots % 2 === 0 ? NULL : ballots % 2;
//     for (ballot in ballots) {
//         await startVote(state, ballot, bracketLength, timeLimit);
//     }
// }
//
// export async function startVote(state, ballot, bracketLength, timeLimit) {
//     setTimeout(() => {
//         assignWinner(ballot, bracketLength)
//     },timeLimit)
// }
