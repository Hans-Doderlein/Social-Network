//import user functions
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

const router = require("express").Router();

//routing
router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
