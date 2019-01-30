#!/usr/bin/env ts-node-to

// Perform injection *before* ink is require()d!!
require('../bootstrap').bootstrap();

require('./ui');