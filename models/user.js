const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email adress!`,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//virtual to set friend count
userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
  })
  // Setter to set the friend count
  .set(function (v) {
    this.set(v);
  });

// Initialize our User model
const User = model("user", userSchema);

module.exports = User;
