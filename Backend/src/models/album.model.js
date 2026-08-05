const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
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

    coverImage: {
      type: String,
      default:
        "https://placehold.co/500x500?text=Album",
    },

    description: {
      type: String,
      default: "",
    },

    musics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Music",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Album", albumSchema);