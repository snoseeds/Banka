import bcrypt from 'bcrypt';
import generateToken from '../helpers/generateToken';

const initLoginUser = (typeOfUser, email, suppliedPassword) => {
  const loginUser = (req, res, next) => {
    try {
      const {
        id, firstname: firstName, lastname: lastName, lastvisit: lastVisit, password,
      } = req.user;
      if (bcrypt.compareSync(suppliedPassword, password)) {
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
      }
      const errorObject = {
        name: 400,
        message: 'The supplied password is wrong',
      };
      throw errorObject;
    } catch (error) {
      next(error);
    }
  };
  return loginUser;
};

export default initLoginUser;
