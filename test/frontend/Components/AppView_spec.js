import { expect }     from 'chai';
import React          from 'react';
import ReactDOM       from 'react-dom';
import { renderIntoDocument,
         scryRenderedDOMComponentsWithTag,
         Simulate } from 'react-dom/test-utils';

import { AppView }  from '../../../src/app/Components/AppView/AppView';

describe('AppView', () => {
    it("renders a child element which contains any number of buttons", () => {
            const component = renderIntoDocument(
                <AppView candidates={['SUPERHOT', 'Superflight', 'Valley']} />
            );
            const buttons = scryRenderedDOMComponentsWithTag(component,
                                                             'button');
            expect(buttons.length).to.equal(3);
            expect(buttons[0].textContent).to.equal('SUPERHOT');
            expect(buttons[1].textContent).to.equal('Superflight');
            expect(buttons[2].textContent).to.equal('Valley');
        });

    it("invokes a callback when a button is clicked", () => {
        let votedFor;
        const vote = (candidate) => votedFor = candidate;
        const component = renderIntoDocument(
            <AppView candidates={['SUPERHOT', 'Superflight', 'Valley']}
                    vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component,
                                                         'button');
        Simulate.click(buttons[0]);
        expect(votedFor).to.equal('SUPERHOT');
    });

    it("disables the buttons if user has already voted", () => {
        const component = renderIntoDocument(
            <AppView candidates={['SUPERHOT', 'Superflight']}
                     hasVoted="SUPERHOT" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it("appends label denoting which candidate the user has voted for", () => {
        const component = renderIntoDocument(
            <AppView candidates={['SUPERHOT', 'Superflight']}
                     hasVoted="SUPERHOT" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons[0].textContent).to.contain('Voted!');
    });

    it("presents a results screen when results prop is passed down", () => {
        const results = {
            "winner": "SUPERHOT",
            "runnersUp": ["Superflight", "Valley", "Crysis 2"]
        };
        const component = renderIntoDocument(
            <AppView results={results} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('SUPERHOT');
    });
});
