const {Router} = require('express');
const router = Router();

const userAuthentication = require('../middleware/auth');

const userController = require("../controller/user");
const chatController = require('../controller/chat');

router.use(userAuthentication.authenticate);

router.get('/get-user', userController.getUser);
router.post('/message', chatController.postMessage);
router.get('/messages', chatController.getMessages);

module.exports = router;