const express = require("express");

const msgController= require("../controller/chat");

const router = express.Router();

router.post("/", msgController.postmsg);

module.exports = router;