import { expect }    from 'chai';
import { List, Map } from 'immutable';

import reducer       from '../../../src/app/Redux/reducer';

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
            ballot: Map({
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({
                    'SUPERHOT': 3,
                    'Superflight': 3
                })
            })
        }));
    });

    it("handles SET_STATE when invoked with plain-js", () => {
        const state = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                ballot: {
                    candidates: ['SUPERHOT', 'Superflight'],
                    votes: {
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
                ballot: {
                    candidates: ['SUPERHOT', 'Superflight'],
                    votes: {
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

    it("handles VOTE", () => {
        const state = Map({
            ballot: Map({
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({
                    'SUPERHOT': 1,
                    'Superflight': 1
                })
            })
        });
        const action = {type: 'VOTE', candidate: 'SUPERHOT'};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            ballot: Map({
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({
                    'SUPERHOT': 1,
                    'Superflight': 1
                })
            }),
            hasVoted: 'SUPERHOT'
        }));
    });

    it("does not handle VOTE if passed an invalid candidate", () => {
        const state = Map({
            ballot: Map({
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({
                    'SUPERHOT': 1,
                    'Superflight': 1
                })
            })
        });
        const action = {type: 'VOTE', candidate: 'The Life of Brian'};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            ballot: Map({
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({
                    'SUPERHOT': 1,
                    'Superflight': 1
                })
            })
        }));
    });

    it("starts fresh by removing hasVoted property", () => {
        const state = Map({
            ballot: Map({
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({
                    'SUPERHOT': 1,
                    'Superflight': 1
                })
            }),
            hasVoted: 'SUPERHOT'
        });
        const action = {
            type: 'SET_STATE',
            state: {
                ballot: {
                    candidates: ['Valley', 'Crysis 2']
                }
            }
        };
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            ballot: Map({
                candidates: List.of('Valley', 'Crysis 2')
            })
        }));
    });
});
