import Database from '../models/Database';

const initCheckUserUniquenessInDB = (typeOfUser, uniqueFieldsValues, uniqueFieldsDescription) => {
  let i = -1;
  // eslint-disable-next-line consistent-return
  const checkUserUniquenessInDB = (req, res, next) => {
    // checkUserUniqueness through each of the properties that must be unique
    if (Database[typeOfUser].some(user => Object.values(uniqueFieldsDescription)
    // eslint-disable-next-line no-plusplus
      .some(uniqueField => user[uniqueField] === uniqueFieldsValues[++i]))) {
      return res.status(400).json({
        status: 400,
        error: `${Object.keys(uniqueFieldsDescription)[i]} supplied has already been taken by an existing user`,
      });
    }
    next();
  };
  return checkUserUniquenessInDB;
};

export default initCheckUserUniquenessInDB;
