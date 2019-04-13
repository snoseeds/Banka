import Database from '../models/Database';
import Client from '../models/Client';
import Cashier from '../models/Cashier';
import Admin from '../models/Admin';
import validateFormFields from '../helpers/validateFormFields';
import checkPasswordsMatch from '../helpers/checkPasswordsMatch';
import generateToken from '../helpers/generateToken';


// import bcrypt from 'bcrypt';
// import moment from 'moment';

// import pool from '../models/database';

// const salt = bcrypt.genSaltSync(10);

/**
 * @class UserController
 */
class UserController {
  /**
   * creates new user (client, cashier, or admin)
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} status code with string or json object
   * @memberof UserController
   */
  // eslint-disable-next-line consistent-return
  static signup(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      typeOfUser,
    } = req.body;
    const requiredFields = [firstName, lastName, email, password, typeOfUser];
    const reqdFieldsDescription = {
      1: 'First name',
      2: 'Last name',
      3: 'Email',
      4: 'Password',
      5: 'Type of user',
    };

    const valResult = validateFormFields(requiredFields, reqdFieldsDescription, res);
    if (valResult !== undefined) {
      return valResult;
    }

    const passCheck = checkPasswordsMatch(password, confirmPassword, res);
    if (passCheck !== undefined) {
      return passCheck;
    }

    const checkUserUniqueness = () => {
      if (Database[typeOfUser].some(user => user.email === email)) {
        return res.status(400).json({
          status: 400,
          error: 'A user with the given email already exists',
        });
      }
      return undefined;
    };
    checkUserUniqueness();

    const user = {
      id: Database[typeOfUser].length + 1,
      firstName,
      lastName,
      email,
    };

    /**
     * @description adds a new user to the database
     * @param none, uses scope to access user object, database, and password
     * @returns nothing
     */
    const createAcctInDb = () => {
      // const newClient = new Client(...Object.values(user), bcrypt.hashSync(password, salt));
      const newClient = new Client(...Object.values(user), password);
      const newCashier = new Cashier(...Object.values(user), password);
      const newAdmin = new Admin(...Object.values(user), password);
      switch (typeOfUser) {
        case 'client':
          Database.client.push(newClient);
          break;
        case 'cashier':
          Database.cashier.push(newCashier);
          break;
        case 'admin':
          Database.admin.push(newAdmin);
      }
    };
    createAcctInDb();

    return res.status(201).json({
      status: 201,
      data: {
        token: generateToken({ email, lastName }),
        ...user,
        message: 'Account created successfully',
      },
    });
  }

  /**
   * creates new user (client, cashier, or admin)
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} status code with string or json object
   * @memberof UserController
   */
  // eslint-disable-next-line consistent-return
  static signin(req, res) {
    const {
      email,
      password,
      typeOfUser,
    } = req.body;
    const requiredFields = [email, password, typeOfUser];
    const reqdFieldsDescription = {
      1: 'Email',
      2: 'Password',
      3: 'Type of user',
    };

    const valResult = validateFormFields(requiredFields, reqdFieldsDescription, res);
    if (valResult !== undefined) {
      return valResult;
    }

    const getUserDetails = () => {
      const user = Database[typeOfUser].find(databaseUser => databaseUser.email === email);
      if (user) {
        const {
          id,
          firstName,
          lastName,
        } = user;
        return user.password === password
          ? res.status(201).json({
            status: 201,
            data: {
              token: generateToken({ email, lastName }),
              id,
              firstName,
              lastName,
              email,
              message: 'Login is successful',
            },
          })
          : res.status(400).json({
            status: 400,
            error: 'The supplied password is wrong',
          });
      }
      return res.status(403).json({
        status: 403,
        error: 'User with this email doesn\'t exist',
      });
    };
    getUserDetails();
  }
}

export default UserController;
