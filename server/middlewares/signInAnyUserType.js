import initValidateFields from './validateFormFields';
import initValidateUserType from './validateUserType';
import initLoginUser from './loginUser';
import initCheckUserInDb from './checkUserInDb';
import runMiddlewares from './runMiddlewares';

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
    runMiddlewares(loginMiddlewares, req, res);
  };
  return getAndPersistReqProps;
};

export default initSignInAnyUserType;
