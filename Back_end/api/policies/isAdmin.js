module.exports = function (req, res, proceed) {
  try {
    if (req.user.role !== "admin")
      return res.status(401).json({
        status: 401,
        message: "Access denied",
      });

    return proceed();
  } catch (error) {
    sails.log.error("Server Error: ", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
