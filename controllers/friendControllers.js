const User = require("../models/user");
//handles either add or remove friend option
async function handleFriend({ userID, friendID, mode }) {
  const action = mode === "add" ? "$push" : "$pull";
  try {
    const friend = await User.findOneAndUpdate(
      { _id: userID },
      { [action]: { friends: friendID } },
      { new: true }
    );
    if (!friend) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
module.exports = {
  //pushes friend to users friends array
  async addFriend(req, res) {
    const friend = handleFriend({
      userID: req.params.userId,
      friendID: req.params.friendId,
      mode: "add",
    });
    if (friend) {
      return res.status(200).json({ message: "Friend added!" });
    }
    return res.status(404).json({ message: "Friend could NOT be added" });
  },
  //pulls friends from useers friends array
  async deleteFriend(req, res) {
    const friend = handleFriend({
      userID: req.params.userId,
      friendID: req.params.friendId,
      mode: "delete",
    });
    if (friend) {
      return res.status(200).json({ message: "Friend deleted!" });
    }
    return res.status(404).json({ message: "Friend Not found!" });
  },
};
