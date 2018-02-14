
function setState(state) {
    return { type: 'SET_STATE', state };
}

function vote(candidate) {
    return {
        meta: { remote: true },
        type: 'VOTE',
        candidate
    };
}

function currentVote() {
    return {
        meta: { remote: true },
        type: 'CURRENT_VOTE'
    };
}

export { setState, vote, currentVote };
