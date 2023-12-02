const express = require("express");
const db = require("../data/db");
const jwt = require("jsonwebtoken");
const router = express.Router();

async function refreshVerify(token, id) {
  const userRefresh = await db.query(`SELECT refreshToken FROM member WHERE memberId = (?)`, id);

  try {
    if (token === userRefresh) {
      try {
        jwt.verify(token, process.env.JWT_KEY);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

router.get("/", async (req, res) => {
  if (req.cookies.refreshToken | req.headers.authorization) {
    let decoded;
    if (req.headers.authorization) {
      const accessToken = req.headers.authorization.split("Bearer ")[1];
      decoded = jwt.decode(accessToken);
    } else {
      const refreshToken = req.cookies.refreshToken;
      decoded = jwt.decode(refreshToken);
    }

    const result = refreshVerify(refreshToken, decoded.id);

    if (result) {
      const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({ accessToken: newAccessToken });
    } else {
      res.status(401).send({
        message: "Refresh token has expired.",
      });
    }
  } else {
    res.status(400).json({ message: "Access token and refresh token needed." });
  }
});

module.exports = router;
