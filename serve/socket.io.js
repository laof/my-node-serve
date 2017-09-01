exports.create = (webSocket) => {

    webSocket.on('connection', (socket) => {

        socket.on('group1', (data) => {
            console.log('group1........')
            socket.join('group1');
        });

        console.log('2121');
        socket.on('login', (data) => {
            console.log(data);
        })
        socket.on('message', (msg) => {
            console.dir(msg);
        });

        socket.broadcast.emit("server not me", { data: "hello,everyone" });

        socket.emit('server send', { sisis: 23232 });
    })
}