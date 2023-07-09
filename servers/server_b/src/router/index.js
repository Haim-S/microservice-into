const router = require("express").Router();
const {NotFoundError} = require("../error/Errors");
const errorHandler = require("../error/errorHandler");
const messageRoutes = require("./message.routes");

router.use("/message", messageRoutes);

router.all("*", (req, res, next)=>{
    next(new NotFoundError());
});

router.use(errorHandler);
module.exports = router;