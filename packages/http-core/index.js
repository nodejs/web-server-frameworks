'use strict';
const net = require('net');

function createServer (opts = {}) {
  // @TODO
  const s = net.createServer();
  return {
    listen: (...args) => {
      return s.listen(...args);
    }
  };
}

class IncomingMessage {}
class ServerResponse {}

module.exports = {
  createServer,
  IncomingMessage,
  ServerResponse
};
