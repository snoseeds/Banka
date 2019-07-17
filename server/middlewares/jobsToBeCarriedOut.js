import runMiddlewares from './runMiddlewares';

const initJobsToBeCarriedOut = (functionReturningJobsArray) => {
  const jobsToBeCarriedOut = (req, res) => {
    runMiddlewares([...req.middlewaresArr, ...functionReturningJobsArray(req, res)], req, res);
  };
  return jobsToBeCarriedOut;
};

export default initJobsToBeCarriedOut;
