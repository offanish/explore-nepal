const notFoundMiddleware = (req, res) => {
  res.status(404).json({ msg: "route doesn't exist" });
};

export default notFoundMiddleware;
