const router = require("express").Router();
const apiRoutes = require("./api");

//router
router.use("/api", apiRoutes);

//sets response for ivalid routes
router.use((req, res) => {
  return res.send("Wrong route!");
});

module.exports = router;
