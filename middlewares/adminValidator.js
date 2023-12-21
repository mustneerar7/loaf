const adminValidator = (req, res, next) => {
  if (req.session.user && req.session.user.accountType === "admin") {
    next();
  } else {
    res.status(401).send({
      status: "fail",
      message: "Unauthorized",
    });
  }
};

module.exports = adminValidator;