import React, { PureComponent, Fragment } from 'react';

import Ballot  from '../Ballot/Ballot';
import Results from '../Results/Results';

class AppView extends PureComponent {
    render() {
        return (
            <Fragment>
                { this.props.results
                    ? <Results ref="winner" results={this.props.results} />
                    : <Ballot {...this.props} />
                }
            </Fragment>
        );
    }
}

export default AppView;
