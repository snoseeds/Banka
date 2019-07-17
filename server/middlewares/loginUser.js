import bcrypt from 'bcrypt';
import generateToken from '../helpers/generateToken';

const initLoginUser = (typeOfUser, email, suppliedPassword) => {
  const loginUser = ({ user }, res, next) => {
    try {
      const {
        id, firstname: firstName, lastname: lastName, lastvisit: lastVisit, password,
      } = user;
      if (!bcrypt.compareSync(suppliedPassword, password)) {
        const errorObject = { name: 400, message: 'The supplied password is wrong' };
        throw errorObject;
      }
      return res.status(201).json({
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
      });
    } catch (error) { next(error); }
  };
  return loginUser;
};

export default initLoginUser;
