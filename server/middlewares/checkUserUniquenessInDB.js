import queries from '../PostgreSQL/dbTablesCrudQueries';

const initCheckUserUniquenessInDB = (typeOfUser, uniqueFieldsValues, uniqueFieldsDescription) => {
  // eslint-disable-next-line consistent-return
  const checkUserUniquenessInDB = async (req, res, next) => {
    try {
      let i;
      const uniqFieldsNames = Object.values(uniqueFieldsDescription);
      const arrOfUsersUniqFields = await queries.getRowsOfColumns(typeOfUser, uniqFieldsNames);
      // checkUserUniqueness across each of the properties that must be unique
      if (arrOfUsersUniqFields.some(userObj => uniqFieldsNames
        .some((uniqField, idx) => {
          i = idx;
          return userObj[uniqField.toLowerCase()] === uniqueFieldsValues[idx];
        }))) {
        const errorObject = {
          name: 400,
          message: `${Object.keys(uniqueFieldsDescription)[i]} supplied has already been taken by an existing user`,
        };
        throw errorObject;
      }
    } catch (error) {
      throw error;
    }
  };
  return checkUserUniquenessInDB;
};

export default initCheckUserUniquenessInDB;
