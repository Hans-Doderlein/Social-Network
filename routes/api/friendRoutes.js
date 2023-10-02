//import friend functions
const {
  addFriend,
  deleteFriend,
} = require("../../controllers/friendControllers");

const router = require("express").Router();

//routing
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
