import bcrypt from 'bcrypt';
import generateToken from '../helpers/generateToken';
import issueErrorResponse from '../helpers/issueErrorResponse';

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
    return issueErrorResponse(res, 400, 'The supplied password is wrong');
  };
  return loginUser;
};

export default initLoginUser;
