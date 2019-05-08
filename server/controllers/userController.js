import Database from '../models/Database';
import Client from '../models/Client';
import Cashier from '../models/Cashier';
import Admin from '../models/Admin';
import validateFormFields from '../helpers/validateFormFields';
import checkPasswordsMatch from '../helpers/checkPasswordsMatch';
import generateToken from '../helpers/generateToken';
import authenticateUser from '../helpers/authenticateUser';
import generateAcctNo from '../helpers/generateAcctNo';
import Account from '../models/Account';


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
    // const requiredFields = [firstName, lastName, email, password, typeOfUser];
    const reqdFieldsDescription = {
     'First name': firstName,
     'Last name': lastName,
      Email: email,
      Password: password,
      'Type of user': typeOfUser,
    };

    const valResult = validateFormFields(reqdFieldsDescription, res);
    if (valResult !== null) {
      return valResult;
    }

    const passCheck = checkPasswordsMatch(password, confirmPassword, res);
    if (passCheck !== null) {
      return passCheck;
    }

    // checkUserUniqueness
    if (Database[typeOfUser].some(user => user.email === email)) {
      return res.status(400).json({
        status: 400,
        error: 'A user with the given email already exists',
      });
    }

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
      const typeOfUsers = { client: Client, cashier: Cashier, admin: Admin };
      // Database[typeOfUser].push(new typeOfUsers[typeOfUser](...Object.values(user),
                                                          // bcrypt.hashSync(password, salt));
      Database[typeOfUser].push(new typeOfUsers[typeOfUser](...Object.values(user), password));
    };
    createAcctInDb();

    return res.status(201).json({
      status: 201,
      data: {
        token: generateToken({ email, lastName, typeOfUser }),
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
    // const requiredFields = [email, password, typeOfUser];
    const reqdFieldsDescription = {
      Email: email,
      Password: password,
      'Type of user': typeOfUser,
    };
    const valResult = validateFormFields(reqdFieldsDescription, res);
    if (valResult !== null) {
      return valResult;
    }

    const getUserDetails = () => {
      const user = Database[typeOfUser].find(databaseUser => databaseUser.email === email);
      if (user) {
        const {
          id,
          firstName,
          lastName,
          lastVisit,
        } = user;
        return user.password === password
          ? res.status(201).json({
            status: 201,
            data: {
              token: generateToken({ email, lastName, typeOfUser }),
              id,
              firstName,
              lastName,
              email,
              lastVisit,
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


  /**
   * creates new user (client, cashier, or admin)
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} status code with string or json object
   * @memberof UserController
   */
  // eslint-disable-next-line consistent-return
  static createBankAccount(req, res) {
    const authResult = authenticateUser(req, res);
    if (Array.isArray(authResult)) {
      const [payload] = authResult;
      const {
        accountType,
        idCardType,
        idCardNumber,
        acctMobileNo,
      } = req.body;

      const reqdFieldsDescription = {
        'Type of account (current or savings)': accountType,
        'Type of identification card': idCardType,
        'Identification card number': idCardNumber,
      };

      const valResult = validateFormFields(reqdFieldsDescription, res);
      if (valResult !== null) {
        return valResult;
      }
      const user = Database.client.find(databaseUser => databaseUser.email === payload.email);
      if (user) {
        const {
          firstName,
          lastName,
          email,
          id,
          userMobileNo,
        } = user;
        const accountNumber = generateAcctNo(email, firstName);
        const account = new Account(id + 1, accountNumber, new Date(Date.now()), user.id, accountType,
          idCardType, idCardNumber, acctMobileNo ? acctMobileNo : userMobileNo);
        user.accounts.push(account);
        user.noOfAccounts += 1;
        return res.status(201).json({
          status: 201,
          data: {
            accountNumber,
            firstName,
            lastName,
            email,
            type: accountType,
            openingBalance: 0.00,
            idCardType,
            message: `Congrats!, you now have a new ${accountType} account at Banka!`,
          },
        });
      }
      return res.status(403).json({
        status: 403,
        error: 'Client with this email doesn\'t exist',
      });
    }
    return authResult;
  }
}

export default UserController;
