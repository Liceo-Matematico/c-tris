const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { getActiveResourcesInfo } = require('node:process');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

var games = [];

function validateGamesForUser(socketid) {
    games.forEach(element => {
        if (element.p.includes(socketid)) {
            element.p.splice(element.p.indexOf(socketid), 1);
            notifyGameChangesToClients(element);
        }
        if (element.p.length == 0) {
            games.splice(games.indexOf(element), 1);
        }
    })
}

function joinGame(id, socketid) {
    var exists = false;
    var index = 0;

    validateGamesForUser(socketid);

    for (var i = 0; i < games.length; i++) {

        if (games[i].code == id) {
            if (!games[i].p.includes(socketid) && games[i].p.length < 2) {
                games[i].p.push(socketid);
            }
            if (games[i].p.length >= 2) {
                io.to(socketid).emit('message', "Game with code: \"" + id + "\" is full");
            }
            exists = true;
            index = i;
        }
    }
    if (!exists) {
        games.push({ code: id, p: [socketid] });
        index = games.length - 1;
    }
    notifyGameChangesToClients(games[index]);
    console.log(games);
}
function notifyGameChangesToClients(game) {
    game.p.forEach(element => {
        console.log('emitting to ' + element);
        io.to(element).emit('gameJoined', game);
    });
}



app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.get('/lobby', (req, res) => {
    res.sendFile(join(__dirname, 'lobby.html'));
});


app.get('/game', (req, res) => {
    res.sendFile(join(__dirname, 'game.html'));
});

app.get('/gamecardimg', (req, res) => {
    res.sendFile(join(__dirname, 'gamecardimg.jpg'));
})

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);
    socket.emit('init');

    socket.on('sendMove', (socketid, data) => {
        io.to(socketid).emit('recieveMove', data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id);
        validateGamesForUser(socket.id);
        console.log(games);
    });
    socket.on('joinGame', (id, socketid) => {
        console.log("joining game");
        joinGame(id, socketid);
    });

});



server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});