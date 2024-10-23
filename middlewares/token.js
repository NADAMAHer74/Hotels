const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key";

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).send("Invalid Token");
    }

    req.user = user; // Ensure you're setting req.user correctly
    next();
  });
}

const checkRole = (roles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden." });
    }
  };
};

module.exports = {
  verifyToken,
  checkRole,
};
