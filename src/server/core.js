import { List, Map } from 'immutable';

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

export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

export function currentVote(state, n = 2) {
    const entries = state.get('entries').concat(
        assignWinner(state.get('ballot'))
    );
    if(entries.size === 1) {
        return state.remove('ballot')
                    .remove('entries')
                    .set('winner', entries.first())
    }

    const candidates  = entries.take(n);
    const nextEntries = entries.skip(n);
    return state.merge({
        ballot: Map({ candidates }),
        entries: nextEntries
    });
}

export function vote(state, entry) {
    return state.updateIn(
        ['votes', entry],
        0,
        (votes) => votes + 1
    );
}

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
