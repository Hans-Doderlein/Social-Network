const { User } = require("../models/index");

module.exports = {
  //returns all users from the user collection
  async getUsers(req, res) {
    try {
      const users = await User.find();
      if (users) {
        return res.json(users);
      }
      return res.status(404).json({ message: "No users found!" });
    } catch (error) {
      res.json({ err: error });
    }
  },
  //returns a single user from the colletion using their _id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (user) {
        return res.json(user);
      }
      return res.status(404).json({ message: "User NOT found!" });
    } catch (error) {
      res.json({ err: error });
    }
  },
  //removes a user from the collection
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (user) {
        return res.json({ message: "User Deleted" });
      }
      return res.json({ message: "User not found" });
    } catch (error) {
      res.json({ err: error });
    }
  },
  //updates user property in the collection
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      if (user) {
        return res.json({ message: "User successfully updated" });
      }
      return res.json({ message: "Update failed" });
    } catch (error) {
      res.json({ err: error });
    }
  },
  //created a new user and adds it to the collection
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      if (newUser) {
        return res.json(newUser);
      }
      return res.json({ message: "User could not be created" });
    } catch (error) {
      res.json({ err: error });
    }
  },
};
