/**  AUTHOR: hbates@northmen.org
 *   VERSION: 1.0.0
 *   CREATED: 3.17.2016
 *   PURPOSE: Demo Node.js & WebSockets interaction
 */

"use strict";

class app {
     constructor() {
          app.startWebSockets();
     }

     static startWebSockets() {
          const DATAHANDLER = require(__dirname + '/node/DataHandler'),
               WEBSOCKETSERVER = require('websocket').server,
               HTTP = require('http'),
               PORT = 8002;

          let server = HTTP.createServer(function(request, response) {
               console.log((new Date()) + ' Received request for ' + request.url);
               response.writeHead(404);
               response.end();
          });

          server.listen(PORT, function() {
               console.log((new Date()) + ' Server is listening on port ' + PORT);
          });

          let wsServer = new WEBSOCKETSERVER({
               httpServer: server,
               autoAcceptConnections: false
          });

          wsServer.on('request', function(request) {
               if (!app.originIsAllowed(request.origin)) {
                    request.reject();
                    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
                    return;
               }

               var connection = request.accept('echo-protocol', request.origin);
               console.log((new Date()) + ' Connection accepted.');

               connection.on('message', function(message) {
                    let data = new DATAHANDLER(3).readData(__dirname + '/data/data.csv');
                    if (message.type === 'utf8') {
                         if (message.utf8Data == 0) {
                              console.log('HelloKitty Initiated!');
                              let person = data[0][1] + ' ' + data[0][0];
                              connection.sendUTF(person);
                         } else if (message.utf8Data === 'zzz') {
                              data[0][1] = 'Arwen';
                              new DATAHANDLER(3).writeData(data, __dirname + '/data/data.csv');
                              connection.sendUTF("Data Written. :-)");
                         } else {
                              console.log('Received Message: ' + message.utf8Data);
                              connection.sendUTF(message.utf8Data);
                         }
                    } else if (message.type === 'binary') {
                         console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                         connection.sendBytes(message.binaryData);
                    }
               });

               connection.on('close', function (reasonCode, description) {
                    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
               });
          });
     }


     static originIsAllowed(origin) {
          return true;
     }
}

module.exports = app;