import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Database from '../models/Database';
import Client from '../models/Client';
import Cashier from '../models/Cashier';
import Admin from '../models/Admin';


// import moment from 'moment';

// import pool from '../models/database';

const salt = bcrypt.genSaltSync(10);
const secretKey = 'andela';

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
    /**
     * @description checks (firstName, lastName, and password) for error
     * @param uses firstName from req.body above
     * @param uses lastName from req.body above
     * @param uses password from req.body above
     * @param uses email from req.body above
     * @param next express next to execute next middleware
     * @returns {object} JSON
    */
    const validateSignUpFields = () => {
      const inputs = {
        1: 'First name',
        2: 'Last name',
        3: 'Email',
        4: 'Password',
        5: 'Type of user',
      };
      let idx = 0;
      if ([firstName, lastName, email, password, typeOfUser].some((inputField) => {
        idx += 1;
        return !inputField; })) {
          return res.status(400).json({
            status: 400,
            error: `${inputs[idx]} is required`,
            });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          status: 400,
          error: 'Passwords do not match',
        });
      }
    }
    validateSignUpFields();

    const checkUserUniqueness = () => {
      if (Database[typeOfUser].some(user => user.email === email)) {
        return res.status(401).json({
          status: 400,
          error: 'A user with the given email already exists',
        })
      }
    }
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
      const newClient = new Client(...Object.values(user), bcrypt.hashSync(password, salt));
      const newCashier = new Cashier(...Object.values(user), bcrypt.hashSync(password, salt));
      const newAdmin = new Admin(...Object.values(user), bcrypt.hashSync(password, salt));
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
    }
    createAcctInDb();

    const generateToken = payload => jwt.sign(payload, secretKey, { expiresIn: '1week' });

    return res.status(201).json({
      status: 201,
      data: {
        token: generateToken({ email, lastName }),
        ...user,
        message: 'Account created successfully',
      },
    });
  }
}

export default UserController;
