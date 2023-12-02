const jwt = require("jsonwebtoken");
require("dotenv").config();

function verify(token) {
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_KEY);
    return {
      ok: true,
      id: decoded.id,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message,
    };
  }
}

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const result = verify(token);
    if (result.ok || token) {
      req.memberId = result.id;
      next();
    } else {
      res.status(401).send({
        ok: false,
        message: result.message,
      });
    }
  } else {
    res.status(401).send({
      ok: false,
      message: result.message,
    });
  }
};

module.exports = auth;
