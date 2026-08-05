const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },

    genre: {
      type: String,
      default: "Unknown",
    },

    coverImage: {
      type: String,
      default:
        "https://placehold.co/500x500?text=Music",
    },

    uri: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Music", musicSchema);