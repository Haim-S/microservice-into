const router = require("express").Router();
const catchAsyncError = require("../error/catchAsyncError");
const messageController = require("../controllers/message.controllers");


router.post("/create", catchAsyncError(messageController.getMessageAndSave));

module.exports = router;