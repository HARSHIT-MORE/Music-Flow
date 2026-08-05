const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

function authArtist(req, res, next) {
  auth(req, res, () => {
    if (req.user.role !== "artist") {
      return res.status(403).json({
        message: "Only artists can access this resource",
      });
    }

    next();
  });
}

module.exports = {
  auth,
  authArtist,
};