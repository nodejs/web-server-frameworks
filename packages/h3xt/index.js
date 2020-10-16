'use strict';
const fs = require('fs');
const http = require('http-next');

module.exports = (opts) => new Application(opts);

class Application extends Function {
  constructor (opts = {}) {
    // Application is a valid handler function
    super('req', 'return this.handle.call(this, req)');
    this.opts = opts;
    this.server = null;
    const self = this.bind(this);
    self.listen = this.listen.bind(this);
    return self;
  }

  listen (...args) {
    // Create underlying server instance
    this.server = http.createServer({
      allowHTTP1: typeof this.opts.allowHTTP1 === 'boolean' ? this.opts.allowHTTP1 : true,
      allowHTTP2: typeof this.opts.allowHTTP2 === 'boolean' ? this.opts.allowHTTP2 : true,
      allowHTTP3: typeof this.opts.allowHTTP1 === 'boolean' ? this.opts.allowHTTP3 : true
      // @TODO
      // key: this.opts.key || fs.readFileSync('localhost-privkey.pem'),
      // cert: this.opts.cert || fs.readFileSync('localhost-cert.pem')
    });

    // handle requests
    this.server.handle(this);

    // Start listening, same func signature as underlying .listen
    return this.server.listen(...args);
  }

  async handle (req) {
    // ... handle request routing ...
    return req.respondWith(404, 'Not Found', {
      'content-type': 'text/plain'
    });
  }

  use () {
    return this;
  }

  get () {
    return this;
  }

  post () {
    return this;
  }
}
