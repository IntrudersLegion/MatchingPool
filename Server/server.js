var net = require('net');
var colors = require('colors');

var server = net.createServer();

var HOST = '127.0.0.1';
var PORT = 1488;

//EDD que tiene los clientes conectados, la idea es extender esto y hacerlo mas eficiente
var clients = [];

//cada vez que se conecta un cliente al server se ejecuta esto
server.on('connection',function(socket){

    var remoteAdress = socket.remoteAddress + ":" + socket.remotePort;
    console.log("New client connection is made %s".yellow, remoteAdress);

    socket.on('data',function(data){
        console.log("Data sent from %s: %s".green,remoteAdress,data);
        socket.write("Welcome, waiting for another player ...".yellow);
        //agrego el cliente a la EDD
        clients.push(socket.name);
    });

    socket.once('close',function(){
        console.log("Connection from %s closed".yellow,remoteAdress);
    });

    socket.on('error',function(err){
        console.log("Connection %s error %s ".red,remoteAdress,err.message);
    });

});

server.listen(PORT,function () {
    console.log("server listening to %j".green,server.address());
});
