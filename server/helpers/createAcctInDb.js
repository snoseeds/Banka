import bcrypt from 'bcrypt';
import queries from '../PostgreSQL/dbTablesCrudQueries';

const salt = bcrypt.genSaltSync(10);

const createAcctInDb = async (typeOfUser, firstName, lastName, email, password,
  mobileNo, houseAddress, idCardType, idCardNumber) => {
  try {
    const basicDetails = {
      firstName, lastName, email, mobileNo,
    };
    if (typeOfUser === 'client') {
      const columnsToBeInsertedArr = [...Object.keys(basicDetails), 'password'];
      const valuesToBeInsertedArr = [...Object.values(basicDetails),
        bcrypt.hashSync(password, salt)];
      const columnsToBeReturnedArr = ['id', ...Object.keys(basicDetails)];
      const newlyInsertedUserObj = await queries.insert('client', columnsToBeInsertedArr,
        valuesToBeInsertedArr, columnsToBeReturnedArr);
      return newlyInsertedUserObj;
    }

    const extendedDetails = {
      houseAddress, idCardType, idCardNumber,
    };
    const columnsToBeInsertedArr = [...Object.keys(basicDetails), 'password',
      ...Object.keys(extendedDetails)];
    const valuesToBeInsertedArr = [...Object.values(basicDetails), bcrypt.hashSync(password, salt),
      ...Object.values(extendedDetails)];
    const columnsToBeReturnedArr = ['id', ...Object.keys(basicDetails), ...Object.keys(extendedDetails)];
    const newlyInsertedUserObj = await queries.insert(typeOfUser,
      columnsToBeInsertedArr, valuesToBeInsertedArr, columnsToBeReturnedArr);
    return newlyInsertedUserObj;
  } catch (error) {
    throw error;
  }
};

export default createAcctInDb;
