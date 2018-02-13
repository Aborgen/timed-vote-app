
function setState(state) {
    return { type: 'SET_STATE', state };
}

function vote(candidate) {
    return { type: 'VOTE', candidate };
}

export { setState, vote };
