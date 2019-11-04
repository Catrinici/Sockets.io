module.exports = function Route(app, server) {
    var io = require('socket.io').listen(server);
    var id = 0;
    var messages = {};
    var users = {};

    io.sockets.on('connection', function(socket) {
        socket.on('got_new_user', function(data) {
            users[socket.id] = { name: data.name };
            socket.emit('existing_messages', messages);
            io.emit('display_new_user', { name: data.name });
        });
        socket.on('new_message', function(data) {
            messages[id] = { name: data.name, message: data.message };
            io.emit('update_messages', messages[id]);
            id++;
        });
        socket.on('disconnect', function() {
            io.emit('user_disconnect', users[socket.id]);
        });
    });
    app.get('/', function(req, res) {
        res.render('index');
    });
};