import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';

class Ballot extends PureComponent {
    componentWillMount() {
        return this.getCandidates();
    }

    getCandidates() {
        return this.props.candidates || [];
    }

    disableVoting() {
        return this.props.hasVoted ? true : false;
    }

    render() {
        const { candidates, hasVoted, vote } = this.props;
        const options = candidates.map((candidate) => {
            return (
                <button style={{"float":"left"}} key={candidate}
                        disabled={this.disableVoting()}
                        onClick={() => vote(candidate)}
                        className="candidate">
                    <h1>{candidate}</h1>
                    { hasVoted === candidate &&
                      <div className="label">Voted!</div> }
                </button>
            )
        });
        return (
            <div className="ballot">{options}</div>

        );
    }
}

export default Ballot;
Ballot.propTypes = {
    candidates: PropTypes.array
}
