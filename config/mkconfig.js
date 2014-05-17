#!/usr/bin/env node

var path = require('path');
var fs = require('fs');

// Ruta al fichero de configuracion
var config_path = path.dirname(process.argv[1]) + '/config.json';

if (! process.env.DATABASE_URL) {
    console.log('ERROR: No existe la variable de entorno DATABASE_URL.')
    console.log('En local, ejecute: "foreman run node config/mkconfig.js"');
    process.exit(1);
}

var vals = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

var config_value = {
    "dialect":  vals[1],
    "protocol": vals[1],
    "username": vals[2],
    "password": vals[3],
    "host":     vals[4],
    "port":     vals[5],
    "database": vals[6],
    "omitNull": true,
    "storage":  process.env.DATABASE_STORAGE
};

// Crear fichero de configuracion
fs.writeFileSync(config_path, JSON.stringify(config_value,null,2));
