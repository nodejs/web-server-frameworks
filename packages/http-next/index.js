'use strict';
const {
  createServer,
  IncomingMessage,
  ServerResponse
} = require('http-core');

class NextIncomingMessage extends IncomingMessage {}
class NextServerResponse extends ServerResponse {}

module.exports = {
  IncomingMessage: NextIncomingMessage,
  ServerResponse: NextServerResponse,

  createServer: (opts = {}) => {
    // Overload the lower level implementation
    // with higher level apis, also this would
    // possiably create multiple servers for http1/2/3
    // and pave over some of the lower level differences
    const s = createServer({
      // Higher level classes with "sugar" methods
      // and more approachable api's
      IncomingMessage: NextIncomingMessage,
      ServerResponse: NextServerResponse,

      // This is very unlikely to be the api, just here
      // as a note about req.url
      parseRequestUrl: (server, path) => {
        const sa = server.address();
        return new URL(path, `https://${sa.address}:${sa.port}`);
      },

      ...opts
    });

    s.handle = (fnc) => {};
    return s;
  }
};
