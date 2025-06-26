const Cache = require('./cache');
const DB = require('./db');
const Log = require('./log');
const Response = require('./response');
const { getHTML } = require('./template');

module.exports = {
  Cache,
  DB,
  Log,
  Response,
  getHTML
};
