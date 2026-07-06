// handler should be async and controller
export const asyncHandler = (handler) => {
  return (req, res, next) => {
    try {
      handler(req, res, next);
    } catch (error) {
        next(error);
    }
  };
};
