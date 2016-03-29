'use strict'
const jsonParser = require('body-parser').json({limit: '50mb'});
const userController = require('../controllers/userController.js');
const huntController = require('../controllers/huntController.js');
const chatController = require('../controllers/chatController.js');

module.exports = (app, express) => {

  app.use(jsonParser);
  app.use(express.static('./client/www'));

  app.post('/feedback', jsonParser, huntController.feedback);
  app.post('/tasks', jsonParser, huntController.huntMaker);
  app.post('/upload', jsonParser, huntController.upload);
  app.post('/signup', jsonParser, userController.signup);
  app.post('/signin', jsonParser, userController.signin);
  app.post('/userProfile', jsonParser, userController.getUserInfo);
  app.post('/addFriend', jsonParser, userController.addUserToFriendsList);
  app.post('/getFriends', jsonParser, userController.retrieveUserFriends);
  app.post('/getFriendHunt', jsonParser, userController.retrieveFriendHunt);
  app.post('/addChatMessage', jsonParser, chatController.insertChatMessage);
  app.post('/getChatMessages', jsonParser, chatController.retrieveChatMessages);
  app.post('/singleHunt', jsonParser, huntController.retrieveSingleHunt);

}
