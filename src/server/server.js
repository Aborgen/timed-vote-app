import Server from 'socket.io';

function startServer(store, port = 8080) {
    const io = new Server().attach(port);
    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );
    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS())
        socket.on('action', store.dispatch.bind(store))
        console.count("IT IS I");
    });
}

export default startServer;
