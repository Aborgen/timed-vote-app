import { expect }     from 'chai';
import { List, Map }  from 'immutable';
import React          from 'react';
import ReactDOM       from 'react-dom';
import { renderIntoDocument,
         scryRenderedDOMComponentsWithClass,
         Simulate }    from 'react-dom/test-utils';

import { ResultsView } from '../../../src/app/Components/ResultsView/ResultsView';

describe('ResultsView', () => {
    it("renders any number of candidate and vote number groups", () => {
        const candidates = List.of('SUPERHOT', 'Superflight', 'Valley');
        const votes = Map({
            'SUPERHOT': 4,
            'Superflight': 3
        });
        const component = renderIntoDocument(
            <ResultsView candidates={candidates} votes={votes} />
        );
        const group
            = scryRenderedDOMComponentsWithClass(component, 'candidate');
        expect(group[0].textContent).to.contain('SUPERHOT');
        expect(group[1].textContent).to.contain('Superflight');
        expect(group[2].textContent).to.contain('Valley');
    });

    it("starts the next vote when the next button is clicked", () => {
        let callBackInvoked = false;
        const candidates = List.of('SUPERHOT', 'Superflight');
        const nextVote  = () => callBackInvoked = true;
        const component = renderIntoDocument(
            <ResultsView candidates={candidates}
                         votes={Map()}
                         nextVote={nextVote} />
        );
        Simulate.click(ReactDOM.findDOMNode(component.refs.nextVote));
    });

    it("shows the winner and runnersup when passed the results prop", () => {
        const results = {
            'winner': 'SUPERHOT',
            'runnersUp': ['Superflight', 'Valley']
        };
        const candidates = List.of('SUPERHOT', 'Superflight');
        const component = renderIntoDocument(
            <ResultsView results={results}
                         candidates={candidates}
                         votes={Map()} />
        );
        const winner = ReactDOM.findDOMNode(component.refs.winner)
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('SUPERHOT');
    });
});
