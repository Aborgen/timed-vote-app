import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppView           from './Components/AppView/AppView';
import ResultsView       from './Components/ResultsView/ResultsView';

class App extends Component {
    render() {
        const result = {
            "winner": 'SUPERHOT',
            "runnersUp": ['Superflight', 'Valley', 'Crysis 2']
        };
        // const result = null;
        const voted = 'SUPERHOT';
        return (
            <Switch>
                <Route exact={true} path="/">
                    <AppView hasVoted={voted}
                             vote={this.props.vote}
                             results={result} />
                </Route>
                <Route path="/results">
                    <ResultsView />
                </Route>
            </Switch>
        );
    }
}

export default App;
