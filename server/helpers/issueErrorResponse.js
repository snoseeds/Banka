const issueErrorResponse = (res, errCode, errMessage) => res.status(errCode)
  .json({
    status: errCode,
    error: errMessage,
  });

export default issueErrorResponse;
