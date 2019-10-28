module.exports = function Route(app, server) {
//this gets the socket.io module
var io = require('socket.io').listen(server)
    //root route to render the index.ejs view
app.get('/', function(req, res) {
        res.render('index')
    })
    //listen to connection even from the client side
io.sockets.on('connection', function(socket) {
    //server listens tp "posting_form" event
    var counter = 0;
    $('#button').click(function() {
        counter++;


    })


    //will emit the data to the c lient
    socket.emit('counting', { response: data });


})
})
}