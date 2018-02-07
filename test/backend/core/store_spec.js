import { List, Map } from 'immutable';
import { expect }      from 'chai';

import makeStore           from '../../../src/server/store';

describe('store', () => {
    it("is a Redux store", () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());
        store.dispatch({
            type: "SET_ENTRIES",
            entries: ['SUPERHOT', 'Superflight', 'Valley']
        });
        expect(store.getState()).to.equal(Map({
            entries: List.of('SUPERHOT', 'Superflight', 'Valley')
        }));
    });
});
