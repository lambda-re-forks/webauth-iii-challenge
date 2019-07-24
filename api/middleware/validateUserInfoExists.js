module.exports = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      errorMessage: "Bad request: please include a username and password"
    });
  } else {
    next();
  }
};
