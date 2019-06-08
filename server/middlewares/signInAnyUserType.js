import async from 'async';
import initValidateFields from './validateFormFields';
import initValidateUserType from './validateUserType';
import initLoginUser from './loginUser';
import initCheckUserInDb from './checkUserInDb';

const initSignInAnyUserType = (expectedUserType) => {
  const getAndPersistReqProps = (req, res) => {
    const {
      email,
      password,
      typeOfUser,
    } = req.body;
    const reqdFieldsDescription = {
      Email: email,
      Password: password,
      'Type of user': typeOfUser,
    };
    const loginMiddlewares = [
      initValidateFields(reqdFieldsDescription),
      initValidateUserType(expectedUserType, typeOfUser),
      initCheckUserInDb(email),
      initLoginUser(typeOfUser, email, password),
    ];
    // eslint-disable-next-line consistent-return
    async.series(loginMiddlewares.map(mw => mw.bind(null, req, res)));
  };
  return getAndPersistReqProps;
};

export default initSignInAnyUserType;
