
const { connect, connection } = require('mongoose');

connect('mongodb://localhost/populistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;