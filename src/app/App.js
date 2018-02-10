import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { List, Map }     from 'immutable';

import AppView           from './Components/AppView/AppView';
import ResultsView       from './Components/ResultsView/ResultsView';

class App extends PureComponent {
    render() {
        return (
            <Switch>
                <Route exact={true} path="/">
                    <AppView vote={this.props.vote}/>
                </Route>
                <Route path="/results">
                    <ResultsView />
                </Route>
            </Switch>
        );
    }
}

export default App;
