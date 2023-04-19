const mongoose = require('mongoose');
const User = require('./models/user');
const Thought = require('./models/thought');

mongoose.connect('mongodb://localhost/thoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  // Create a user
  const user = await User.create({
    username: 'JohnDoe',
    email: 'johndoe@example.com'
  });

  // Create a thought for the user
  const thought = await Thought.create({
    thoughtText: 'This is my first thought',
    user: user._id
  });

  // Add the thought to the user's thoughts array
  user.thoughts.push(thought._id);
  await user.save();

  console.log('Data seeded successfully');

  // Close the database connection
  mongoose.connection.close();
});

 module.exports = seed;