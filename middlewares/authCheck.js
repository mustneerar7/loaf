/**
 * Checks if user is authenticated before granting access to a route.
 * @module authCheck
 */

const authCheck = (async = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized."
    });
  }
  next();
});

module.exports = authCheck;
