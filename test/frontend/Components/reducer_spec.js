import { expect }    from 'chai';
import { List, Map } from 'immutable';

import reducer       from '../../../src/app/reducer';

describe('reducer', () => {
    it("handles SET_STATE", () => {
        const state  = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                ballot: Map({
                    candidates: List.of('SUPERHOT', 'Superflight'),
                    votes: Map({
                        'SUPERHOT': 3,
                        'Superflight': 3
                    })
                })
            })
        };
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            ballot: {
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({
                    'SUPERHOT': 3,
                    'Superflight': 3
                })
            }
        }));
    });

    it("handles SET_STATE when invoked with plain-js", () => {
        const state = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                'balot': {
                    'candidates': ['SUPERHOT', 'Superflight'],
                    'votes': {
                        'SUPERHOT': 3,
                        'Superflight': 3
                    }
                }
            }
        };
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            ballot: Map({
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({
                    'SUPERHOT': 3,
                    'Superflight': 3
                })
            })
        }));

    });

    it("handles SET_STATE if not provided with initial state", () => {
        const state = undefined;
        const action = {
            type: 'SET_STATE',
            state: {
                'balot': {
                    'candidates': ['SUPERHOT', 'Superflight'],
                    'votes': {
                        'SUPERHOT': 3,
                        'Superflight': 3
                    }
                }
            }
        };
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            ballot: Map({
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({
                    'SUPERHOT': 3,
                    'Superflight': 3
                })
            })
        }));
    });
});
