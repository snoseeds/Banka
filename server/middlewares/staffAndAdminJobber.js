import async from 'async';

const initStaffAndAdminJobber = (typeOfJob) => {
  const staffAndAdminJobber = (req, res) => {
    async.series([...req.middlewaresArr, typeOfJob].map(mw => mw.bind(null, req, res)));
  };
  return staffAndAdminJobber;
};

export default initStaffAndAdminJobber;
