import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import Ballot  from '../Ballot/Ballot';
import Results from '../Results/Results';

export class AppView extends PureComponent {
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

const mapStateToProps = (state) => {
    return {
        candidates: state.getIn(['ballot', 'candidates']),
        hasVoted  : state.get('hasVoted'),
        results   : state.get('results')
    };
};

export default connect(mapStateToProps)(AppView);
