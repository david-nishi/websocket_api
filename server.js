const PORT = 8000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const faker = require('faker');

app.use(express.static('public-react/build'));

const members = {};


io.on('connection', socket => {
  let username = `${faker.internet.userName()}`;
  socket.emit(
    'message-all', 
    {
      user: 'admin',
      text: members.length === 0 ?
        'You\'re the first one here!':
        `You joined the chat with ${require('./utils/nameList')(Object.keys(members))}`,
      timestamp: new Date()
    }
  )
  members[username] = socket.id;

  sendUserUpdate(username);
  
  console.log('client connected!');
  console.log(members);
  
  socket.on('reset-username', newName => {
    const oldUsername = username;
    delete members[username];
    username = newName;

    sendUserUpdate(username, oldUsername);

    members[username] = socket.id;
  });

  socket.on('message-all', msg => {
    console.log(msg);
    socket.broadcast.emit('message-all', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('client disconnected');
    socket.broadcast.emit(
      'message-all', 
      {
        user: username,
        text: 'disconnected',
        timestamp: new Date()
      }
    );
    delete members[username];
  });
  
  function sendUserUpdate(newUsername, oldUsername = null) {
    socket.emit('set-username', { newUsername });
    socket.broadcast.emit('member-update', { 
      newUsername, oldUsername 
    });
    socket.broadcast.emit(
      'message-all', 
      {
        user: newUsername,
        text: oldUsername ?
          `name changed from :${oldUsername}` :
          'joined chat',
        timestamp: new Date()
      }
    );
  }
});



server.listen(PORT, () => console.log('server started on port:', PORT));