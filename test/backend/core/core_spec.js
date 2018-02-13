import { expect }     from 'chai';
import { List, Map }  from 'immutable';

import { setEntries, currentVote, vote } from '../../../src/server/core';

describe("application logic", () => {
    describe('setEntries', () => {
        it("adds entries to the state", () => {
            const state = Map();
            const entries = ['SUPERHOT', 'Superflight', 'Valley'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('SUPERHOT', 'Superflight', 'Valley')
            }));
        });
    });

    describe('currentVote', () => {
        it("creates state containing n entries of available candidates", () => {
            const entries = List.of('SUPERHOT', 'Superflight', 'Valley');
            const state = Map({ entries });
            const nextState = currentVote(state);
            expect(nextState).to.equal(Map({
                ballot: Map({
                    candidates: List.of('SUPERHOT', 'Superflight')
                }),
                entries: List.of('Valley')
            }));
        });

        it("appends the winning candidate to the entries list", () => {
            const state = Map({
                ballot: Map({
                    candidates: List.of('SUPERHOT', 'Superflight'),
                    votes: Map({
                        'SUPERHOT': 4,
                        'Superflight': 3
                    })
                }),
                entries: List.of('Valley', 'Crysis 2', 'Attack on Titan')
            });
            const nextState = currentVote(state);
            expect(nextState).to.equal(Map({
                ballot: Map({
                    candidates: List.of('Valley', 'Crysis 2')
                }),
                entries: List.of('Attack on Titan', 'SUPERHOT')
            }));
        });

        it("includes the results if there is no upcoming entry left", () => {
            const state = Map({
                ballot: Map({
                    candidates: List.of('SUPERHOT', 'Superflight', 'Valley'),
                    votes: Map({
                        'SUPERHOT': 26,
                        'Superflight': 25,
                        'Valley': 5
                    })
                }),
                entries: List()
            });
            const nextState = currentVote(state, 3);
            expect(nextState).to.equal(Map({
                results: Map({
                    runnersUp: List.of('Superflight', 'Valley'),
                    winner: 'SUPERHOT'
                })
            }));
        });
    });

    describe('vote', () => {
        it("creates a vote counter if one does not exist", () => {
            const state = Map({
                candidates: List.of('SUPERHOT', 'Superflight')
            });
            const nextState = vote(state, 'SUPERHOT');
            expect(nextState).to.equal(Map({
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({ 'SUPERHOT': 1 })
            }));
        });

        it("increments the vote counter if it does exist", () => {
            const state = Map({
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({
                    'SUPERHOT': 3,
                    'Superflight': 3
                })
            });
            const nextState = vote(state, 'SUPERHOT');
            expect(nextState).to.equal(Map({
                candidates: List.of('SUPERHOT', 'Superflight'),
                votes: Map({
                    'SUPERHOT': 4,
                    'Superflight': 3
                })
            }));
        });
    });
});
