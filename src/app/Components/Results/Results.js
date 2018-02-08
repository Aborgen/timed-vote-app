import React, { PureComponent } from 'react';

class Results extends PureComponent {
    render() {
        const { runnersUp, winner } = this.props.results;
        const podium = runnersUp.map((candidate) => {
            return (
                <span style={{"paddingRight":"5px"}}
                      className="runnerUp__candidate"
                      key={candidate}>
                    {candidate}
                </span>
            );
        });
        return (
            <div className="results">
                <div className="runnersUp">
                    {podium}
                </div>
                <div className="winner">
                    <span className="winner__candidate">
                        The winner is {winner}!
                    </span>
                </div>
            </div>
        );
    }
}

export default Results;
