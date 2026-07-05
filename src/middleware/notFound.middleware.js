const NotFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "route not found",
  });
};

export default NotFound;
