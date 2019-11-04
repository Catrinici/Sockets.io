module.exports = function Route(app, server) {
    //this gets the socket.io module
    var io = require('socket.io').listen(server);
    //root route to render the index.ejs view

    //listen to connection even from the client side
    io.sockets.on('connection', function(socket) {
        //server listens tp "posting_form" event
        var count = 0;
        socket.on('button_click', function(data) {
            count++;
            console.log('counter: ', count);
            socket.emit('update_count', { count: count });
        });
        socket.on('reset', function(data) {
            count = 0;
            console.log('counter', count);
            socket.emit('update_count', { count: count });
        });

        //will emit the data to the c lient
        // socket.emit('count', { response: data });
    });
    app.get('/', function(req, res) {
        res.render('index');
    });
};