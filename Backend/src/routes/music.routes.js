const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

const musicController = require("../controllers/music.controller");
const auth = require("../middlewares/auth.middleware");

// Artist
router.post(
  "/upload",
  auth.authArtist,
  upload.single("music"),
  musicController.createMusic
);

router.post(
  "/album",
  auth.authArtist,
  musicController.createAlbum
);

router.get(
  "/my-songs",
  auth.authArtist,
  musicController.getMySongs
);

router.delete(
  "/:musicId",
  auth.authArtist,
  musicController.deleteMusic
);

// Logged-in users (artist or normal user)
router.get(
  "/",
  auth.auth,
  musicController.getAllMusic
);

router.get(
  "/albums",
  auth.auth,
  musicController.getAllAlbums
);

router.get(
  "/albums/:albumId",
  auth.auth,
  musicController.getAlbumById
);

router.get(
  "/my-albums",
  auth.authArtist,
  musicController.getMyAlbums
);

router.put(
  "/album/:albumId",
  auth.authArtist,
  musicController.renameAlbum
);

router.delete(
  "/album/:albumId",
  auth.authArtist,
  musicController.deleteAlbum
);

router.get("/my-songs", auth.authArtist, musicController.getMySongs);


module.exports = router;