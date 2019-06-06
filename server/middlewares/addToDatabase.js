import bcrypt from 'bcrypt';
import Database from '../models/Database';
import Client from '../models/Client';
import Cashier from '../models/Cashier';
import Admin from '../models/Admin';
import RootAdmin from '../models/RootAdmin';
import generateToken from '../helpers/generateToken';
import issueErrorResponse from '../helpers/issueErrorResponse';

const salt = bcrypt.genSaltSync(10);

const initAddToDatabase = (typeOfUser, firstName, lastName, email, password,
  mobileNo, houseAddress, idCardType, idCardNumber) => {
  const addToDatabase = (req, res) => {
    // checkMaximumNumberOfRootAdmins
    if (typeOfUser === 'rootAdmin' && Database.rootAdmin.length + 1 === 4) {
      return issueErrorResponse(res, 403, 'Not Authorized');
    }

    /**
     * @description adds a new user to the database
     * @param none, uses scope to access user object, database, and password
     * @returns nothing
     */
    const createAcctInDb = () => {
      // Database[typeOfUser].push(new typeOfUsers[typeOfUser](...Object.values(user),
      // bcrypt.hashSync(password, salt));
      const basicDetails = {
        id: Database[typeOfUser].length + 1,
        firstName,
        lastName,
        email,
      };
      if (typeOfUser === 'client') {
        Database[typeOfUser].push(new Client(...Object.values(basicDetails),
          bcrypt.hashSync(password, salt)));
        return { ...basicDetails };
      }
      const typeOfInternalUsers = {
        cashier: Cashier,
        admin: Admin,
        rootAdmin: RootAdmin,
      };
      const extendedDetails = {
        mobileNo,
        houseAddress,
        idCardType,
        idCardNumber,
      };
      Database[typeOfUser].push(new typeOfInternalUsers[typeOfUser](...Object.values(basicDetails),
        bcrypt.hashSync(password, salt), ...Object.values(extendedDetails)));
      return { ...basicDetails, ...extendedDetails };
    };
    const user = createAcctInDb();

    if (typeOfUser === 'admin' || typeOfUser === 'cashier') {
      return res.status(201).json({
        status: 201,
        data: {
          ...user,
          message: 'Account created successfully',
        },
      });
    }

    return res.status(201).json({
      status: 201,
      data: {
        token: generateToken({ email, lastName, typeOfUser }),
        ...user,
        message: 'Account created successfully',
      },
    });
  };
  return addToDatabase;
};

export default initAddToDatabase;
