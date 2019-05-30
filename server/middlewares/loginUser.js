import bcrypt from 'bcrypt';
import generateToken from '../helpers/generateToken';

const initLoginUser = (typeOfUser, email, suppliedPassword) => {
  const loginUser = (req, res) => {
    const {
      id,
      firstName,
      lastName,
      lastVisit,
      password,
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
    return res.status(400).json({
      status: 400,
      error: 'The supplied password is wrong',
    });
  };
  return loginUser;
};

export default initLoginUser;
