import Database from '../models/Database';
import Client from '../models/Client';
import Cashier from '../models/Cashier';
import Admin from '../models/Admin';
import generateToken from '../helpers/generateToken';

const initAddToDatabase = (typeOfUser, firstName, lastName, email, password) => {
  const addToDatabase = (req, res) => {
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
  };
  return addToDatabase;
};

export default initAddToDatabase;
