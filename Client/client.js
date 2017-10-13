var readlineSync = require('readline-sync');
var colors = require('colors');
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 1488;

var client = null;

function openConnection(){
    if(client){
        console.log("Connection is already open\n".red);
        setTimeout(function () {
            menu();
        },0);
        return;
    }

    client = new net.Socket();

    client.on('error',function (err) {
        client.destroy();
        client = null;
        console.log("Error -> connection couldn't be opened : %s".red,err.message);
    });

    client.on('data',function (data) {
       console.log("Recieived: %s".cyan,data);
       setTimeout(function () {
           menu();
       },0);
    });

    client.connect(PORT,HOST,function () {
        console.log("connection opened!".blue);
        setTimeout(function () {
            menu();
        },0);
    });
}

function sendData(data){
    if(!client){
        console.log("Connection is not opened\n".red);
        setTimeout(function () {
            menu();
        },0);
        return;
    }
    client.write(data);setTimeout(function () {
        menu();
    },0);

}

function closeConnection(){
    if(!client){
        console.log("Connection is not opened\n".red);
        setTimeout(function () {
            menu();
        },0);
        return;
    }

    client.destroy();
    client = null;

    console.log("Connection has been closed.".yellow);
   setTimeout(function () {
        menu();
    },0);
}

function menu(){

    var lineRead = readlineSync.question("\n1-open,2-send,3-close,4-quit\n");

    switch (lineRead){
        case "1":
            openConnection();
            break;
        case "2":
            var data = "testing communication.\n"
            sendData(data);
            break;
        case "3":
            closeConnection();
            break;
        case "4":
            return;
            break;
        default:
            setTimeout(function () {
                menu();
            },0);
            break;
    };

}

menu();