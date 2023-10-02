const { Thoughts, User } = require("../models");

module.exports = {
  //retrieves all thoughts
  async getThoughts(req, res) {
    console.log("getThoughts");
    try {
      const thoughts = await Thoughts.find();
      if (thoughts) {
        return res.json(thoughts);
      }
      return res.status(404).json({ message: "Thoughts NOT found!!!" });
    } catch (error) {
      res.json({ err: error });
    }
  },
  //retrieves single thought using _id
  async getSingleThought(req, res) {
    console.log("getSingleThought");
    try {
      const thought = await Thoughts.findOne({ _id: req.params.thoughtId });
      if (thought) {
        return res.json(thought);
      }
      return res.status(404).json({ message: "Thought Not found!" });
    } catch (error) {
      res.json({ err: error });
    }
  },
  //created a new thought in the thought collection
  async createThought(req, res) {
    console.log("createThought");
    try {
      const thought = await Thoughts.create(req.body);
      await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought.id } },
        { new: true }
      );
      return res.json({ message: "Thought created and added to user list" });
    } catch (error) {
      return res.json({ err: error });
    }
  },
  //updates a thought property using _id and req.body
  async updateThought(req, res) {
    console.log("updateThought");
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );
      if (thought) {
        return res.json({ message: "Thought updated" });
      }
      return res.json({ message: "Thought could NOT be updated" });
    } catch (error) {
      res.json({ err: error });
    }
  },
  //deleted a thought from the collection using its _id
  async deleteThought(req, res) {
    console.log("deleteThought");
    try {
      const thought = await Thoughts.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (thought) {
        return res.json({ message: "Thought deleted" });
      }
      return res.json({ message: "Though could not be found" });
    } catch (error) {
      res.json({ err: error });
    }
  },
  //pushes a reaction into a thoughts reaction array
  async addReaction(req, res) {
    console.log("addReaction");
    try {
      const reaction = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (reaction) {
        return res.json({
          message: "reaction created and added to thought array",
        });
      }
      return res.json({ message: "Reaction could not be created" });
    } catch (error) {
      console.log(error);
      res.json({ err: error });
    }
  },
  //pulls a reaction from a thoughts reaction array
  async deleteReaction(req, res) {
    console.log("deleteReaction");
    try {
      const reaction = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      if (reaction) {
        console.log("reaction:", reaction);
        return res.json({ message: "Reactions deleted" });
      }
      return res.json({ message: "Reaction not found" });
    } catch (error) {
      res.json({ err: error });
    }
  },
};
