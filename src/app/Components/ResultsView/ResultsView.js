import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import Results from '../Results/Results';

export class ResultsView extends PureComponent {

    getCandidates() {
        return this.props.candidates || [];
    }

    getVotes(candidate) {
        const votes = this.props.votes;
        return votes && votes.has(candidate) ? votes.get(candidate) : 0;
    }

    render() {
        const options = this.getCandidates().map((candidate) => {
            return (
                <Fragment key={candidate}>
                    <div className="candidate">
                        <h1>{candidate}</h1>
                        <div className="votes">
                            {this.getVotes(candidate)}
                        </div>
                    </div>
                </Fragment>
            );
        });
        return (
            <Fragment>
                { this.props.results
                    ? <Results ref="winner" results={this.props.results} />
                    : <div>{options}</div> }
                <div className="management">
                    <button className="nextVote"
                            onClick={this.props.nextVote}
                            ref="nextVote">
                        Next Vote
                    </button>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        candidates: state.getIn(['ballot', 'candidates']),
        votes: state.getIn(['ballot', 'votes']),
        results: state.results
    };
};

export default connect(mapStateToProps)(ResultsView);
