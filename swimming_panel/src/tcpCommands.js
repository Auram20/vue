// tcpCommands.js

export function sendTCPCommand(command) {
    const socket = new WebSocket('ws://192.168.1.166:6900');
    socket.addEventListener('open', function () {
      socket.send(command);
    });
  
    // Add error handling
    socket.addEventListener('error', function (error) {
      console.error('WebSocket error:', error);
    });
  
    // Add close event handling
    socket.addEventListener('close', function () {
      console.log('WebSocket connection closed');
    });
  }
  