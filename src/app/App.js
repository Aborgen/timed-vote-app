import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { List, Map }     from 'immutable';

import AppView           from './Components/AppView/AppView';
import ResultsView       from './Components/ResultsView/ResultsView';

class App extends PureComponent {
    render() {
        const candidates = List.of('SUPERHOT', 'Superflight', 'Valley');
        const result = Map({
            "winner": 'SUPERHOT',
            "runnersUp": List.of(['Superflight', 'Valley', 'Crysis 2'])
        });
        const voted = 'SUPERHOT';
        const votes = Map({'SUPERHOT': 4, 'Superflight': 3})

        return (
            <Switch>
                <Route exact={true} path="/">
                    <AppView candidates={candidates}
                             vote={this.props.vote} />
                </Route>
                <Route path="/results">
                    <ResultsView candidates={candidates}
                                 votes={votes} />
                </Route>
            </Switch>
        );
    }
}

export default App;
