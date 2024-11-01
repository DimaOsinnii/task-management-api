import httpStatus from 'http-status';

export function validate(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
        error: err.message || httpStatus[httpStatus.UNPROCESSABLE_ENTITY],
      });
    }
  };
}
