'use strict';
require('h3xt')()
  .get('/', async () => {
    return {
      hello: 'world'
    };
  })
  .listen(0);
