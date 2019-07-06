import queries from '../PostgreSQL/dbTablesCrudQueries';
import generateToken from '../helpers/generateToken';
import createAcctInDb from '../helpers/createAcctInDb';

const initAddToDatabase = (...args) => {
  const [typeOfUser, , lastName, email] = args;
  const addToDatabase = async (req, res) => {
    try {
      // checkMaximumNumberOfRootAdmins
      if (typeOfUser === 'rootAdmin') {
        const noOfRootAdmins = await queries.getRowsCount('rootAdmin');
        if (noOfRootAdmins + 1 === 4) {
          const errorObject = {
            name: 403,
            message: 'Not Authorized',
          };
          throw errorObject;
        }
      }
      const user = await createAcctInDb(...args);
      let dataToken = {};
      if (typeOfUser === 'client' || typeOfUser === 'rootAdmin') {
        dataToken = { token: generateToken({ email, lastName, typeOfUser }) };
      }
      return res.status(201).json({
        status: 201,
        data: {
          ...dataToken,
          ...user,
          message: 'Account created successfully',
        },
      });
    } catch (error) {
      throw error;
    }
  };
  return addToDatabase;
};

export default initAddToDatabase;
