const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};

module.exports = auth;
