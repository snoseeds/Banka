import Database from '../models/Database';
import generateToken from '../helpers/generateToken';
import issueErrorResponse from '../helpers/issueErrorResponse';
import createAcctInDb from '../helpers/createAcctInDb';

const initAddToDatabase = (...args) => {
  const [typeOfUser, , lastName, email] = args;
  const addToDatabase = (req, res) => {
    // checkMaximumNumberOfRootAdmins
    if (typeOfUser === 'rootAdmin' && Database.rootAdmin.length + 1 === 4) {
      return issueErrorResponse(res, 403, 'Not Authorized');
    }
    const user = createAcctInDb(...args);
    let dataToken = {};
    if (!(typeOfUser === 'admin' || typeOfUser === 'cashier')) {
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
  };
  return addToDatabase;
};

export default initAddToDatabase;
