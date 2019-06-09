import runMiddlewares from './runMiddlewares';

const initStaffAndAdminJobber = (typeOfJob) => {
  const staffAndAdminJobber = (req, res) => {
    runMiddlewares([...req.middlewaresArr, typeOfJob], req, res);
  };
  return staffAndAdminJobber;
};

export default initStaffAndAdminJobber;
