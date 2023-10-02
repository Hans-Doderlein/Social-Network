//import thought and reaction functions
const {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

const router = require("express").Router();

//route to functions
router.route("/").get(getThoughts).post(createThought);
router.route("/:thoughtsId/reactions").post(addReaction);
router.route("/:thoughtsId/reactions/:reactionId").delete(deleteReaction);
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
