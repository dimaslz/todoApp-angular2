'use strict';

var config = {
    name: 'Started page node',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    debug: process.env.DEBUG_MODE || true
};

module.exports = config;
