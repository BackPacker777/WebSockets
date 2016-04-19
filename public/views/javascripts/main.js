/**
 * AUTHOR:  HB
 * VERSION:  0.0.1
 */

"use strict";

window.addEventListener("load", function(event) {
     let status = document.getElementById("status"),
          url = document.getElementById("url"),
          open = document.getElementById("open"),
          close = document.getElementById("close"),
          send = document.getElementById("send"),
          text = document.getElementById("text"),
          message = document.getElementById("message"),
          message2 = document.getElementById("message2"),
          socket;

     status.textContent = " Not Connected";
     url.value = "ws://localhost:8002";
     close.disabled = true;
     send.disabled = true;

     // Create a new connection when the Connect button is clicked
     open.addEventListener("click", function(event) {
          open.disabled = true;
          socket = new WebSocket(url.value, "echo-protocol");

          socket.addEventListener("open", function(event) {
               socket.send(0);
               close.disabled = false;
               send.disabled = false;
               status.textContent = "  Connected";
          });

          // Display messages received from the server
          socket.addEventListener("message", function(event) {
               message.textContent = " Server Says: " + event.data;
          });

          // Display any errors that occur
          socket.addEventListener("error", function(event) {
               message.textContent = " Error: " + event;
          });

          socket.addEventListener("close", function(event) {
               open.disabled = false;
               status.textContent = "  Not Connected";
          });
     });

     // Close the connection when the Disconnect button is clicked
     close.addEventListener("click", function(event) {
          close.disabled = true;
          send.disabled = true;
          message.textContent = "";
          socket.close();
     });

     // Send text to the server when the Send button is clicked
     send.addEventListener("click", function(event) {
          socket.send(text.value);
          text.value = "";
     });
});