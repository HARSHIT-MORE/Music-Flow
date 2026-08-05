const musicModel=require("../models/music.model");
const albumModel=require("../models/album.model")
const {uploadFile}=require("../services/storage.service")
const jwt=require("jsonwebtoken")

  async function createMusic(req, res) {
  try {
    const { title, genre, album } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Music file is required",
      });
    }

    const result = await uploadFile(
      req.file.buffer.toString("base64")
    );

    const music = await musicModel.create({
  title,
  genre,
  album: album || null,
  uri: result.url,
  artist: req.user.id,
});

    res.status(201).json({
      message: "Music uploaded successfully",
      music,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to upload music",
    });
  }
}



async function createAlbum(req, res) {
  try {
    const { title, musics } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Album title is required",
      });
    }

    const songIds = Array.isArray(musics)
      ? musics
      : JSON.parse(musics || "[]");

    const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics: songIds,
    });

    await musicModel.updateMany(
      {
        _id: { $in: songIds },
      },
      {
        album: album._id,
      }
    );

    res.status(201).json({
      message: "Album created successfully",
      album,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
}

async function getAllMusic(req, res) {
  try {
    const musics = await musicModel
      .find()
      .populate("artist", "username email")
      .populate("album", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Music fetched successfully",
      musics,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch music",
    });
  }
}

async function getAllAlbums(req, res) {
  try {
    const albums = await albumModel
      .find()
      .populate("artist", "username email")
      .populate("musics")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Albums fetched successfully",
      albums,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch albums",
    });
  }
}

async function getAlbumById(req,res){
    const albumId=req.params.albumId;
    const album = await albumModel
              .findById(albumId)
              .populate("artist", "username email")
              .populate({
                path: "musics",
                populate: {
                  path: "artist",
                  select: "username email",
                },
              });

    return res.status(200).json({
        message:"Album fetch successfully",
        album:album
    })
}

async function getMySongs(req, res) {
  try {
    const songs = await musicModel
      .find({ artist: req.user.id })
      .populate("album", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Songs fetched successfully",
      songs,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
}

async function deleteMusic(req, res) {
  try {
    const song = await musicModel.findOneAndDelete({
      _id: req.params.musicId,
      artist: req.user.id,
    });

    if (!song) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    res.json({
      message: "Song deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
}
async function getMyAlbums(req, res) {
  try {
    const albums = await albumModel
      .find({ artist: req.user.id })
      .populate("musics")
      .sort({ createdAt: -1 });

    res.json({
      message: "Albums fetched successfully",
      albums,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
}
async function renameAlbum(req, res) {
  try {
    const { title } = req.body;

    const album = await albumModel.findOneAndUpdate(
      {
        _id: req.params.albumId,
        artist: req.user.id,
      },
      {
        title,
      },
      {
        new: true,
      }
    );

    if (!album) {
      return res.status(404).json({
        message: "Album not found",
      });
    }

    res.json({
      message: "Album renamed successfully",
      album,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
}
async function deleteAlbum(req, res) {
  try {

    const album = await albumModel.findOne({
      _id: req.params.albumId,
      artist: req.user.id,
    });

    if (!album) {
      return res.status(404).json({
        message: "Album not found",
      });
    }

    await musicModel.updateMany(
      {
        album: album._id,
      },
      {
        album: null,
      }
    );

    await album.deleteOne();

    res.json({
      message: "Album deleted successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
}

async function getMySongs(req, res) {
  try {
    const musics = await musicModel
      .find({ artist: req.user.id })
      .populate("artist", "username email");

    return res.status(200).json({
      success: true,
      musics,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch songs",
    });
  }
}

module.exports={createMusic , createAlbum, getAllMusic,getAllAlbums,getAlbumById,getMySongs,deleteMusic,getMyAlbums,renameAlbum,deleteAlbum,getMySongs}
