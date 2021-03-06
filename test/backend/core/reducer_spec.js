import { expect }    from 'chai';
import { List, Map } from 'immutable';

import reducer       from '../../../src/server/Redux/reducer';

describe('reducer', () => {
    it("has an initial state", () => {
        const state     = undefined;
        const action    = { type: 'SET_ENTRIES', entries: ['SUPERHOT'] };
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            entries: List.of('SUPERHOT')
        }));
    });

    it("handles SET_ENTRIES", () => {
        const state     = Map();
        const action    = { type: 'SET_ENTRIES', entries: ['SUPERHOT'] };
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            entries: List.of('SUPERHOT')
        }));
    });

    it("handles CURRENT_VOTE", () => {
        const state = Map({
            entries: List.of('SUPERHOT', 'Superflight')
        });
        const action = { type: 'CURRENT_VOTE' };
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            ballot: Map({
                candidates: List.of('SUPERHOT', 'Superflight')
            }),
            entries: List()
        }));
    });

    it("handles VOTE", () => {
        const state = Map({
            ballot: Map({
                candidates: List.of('SUPERHOT', 'Superflight')
            }),
            entries: List()
        });
        const action = { type: 'VOTE', candidate: 'SUPERHOT', n: 2 }
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            ballot: Map({
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({ 'SUPERHOT': 1 })
            }),
            entries: List()
        }));
    });

    it('can be used with reduce(vanilla spec) to perform batch actions', () => {
        const n = 2;
        const actions = [
            { type: 'SET_ENTRIES',
                entries: ['SUPERHOT', 'Superflight', 'Valley']},
            { type: 'CURRENT_VOTE', n },
            { type: 'VOTE', candidate: 'SUPERHOT' },
            { type: 'VOTE', candidate: 'Superflight' },
            { type: 'VOTE', candidate: 'SUPERHOT' },
            { type: 'VOTE', candidate: 'SUPERHOT' },
            { type: 'CURRENT_VOTE', n },
            { type: 'VOTE', candidate: 'SUPERHOT' },
            { type: 'CURRENT_VOTE', n }
        ];
        const finalState = actions.reduce(reducer, Map());
        expect(finalState).to.equal(Map({
            results: Map({
                winner: 'SUPERHOT',
                runnersUp: List.of('Valley')
            })
        }));
    });
});
