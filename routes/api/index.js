const router = require("express").Router();

// /import routes
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");
const friendRoutes = require("./friendRoutes");

//router
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);
router.use("/friends", friendRoutes);

module.exports = router;
