const db = require('mongoose');

module.exports = db.connect('mongodb://localhost:27017/mestodb');
