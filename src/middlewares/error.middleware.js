module.exports = (err, req, res, _next) => {
  const status = err.status || 500;
  const payload = {
    message: err.message || 'Error interno del servidor',
  };
  if (process.env.NODE_ENV !== 'production' && err.cause) {
    payload.cause = err.cause.message;
  }
  res.status(status).json(payload);
};
