import configureCreateAcctMiddlewares from '../helpers/configureCreateAcctMiddlewares';
import getRequiredDetails from '../helpers/getRequiredDetails';
import runMiddlewares from './runMiddlewares';

const initAnyUserTypeAcctCreator = (typeOfCreator, typeOfAccountToBeCreated) => {
  const getAndPersistReqProps = async (req, res, next) => {
    const {
      firstName, lastName, email, password, confirmPassword, typeOfUser,
      mobileNo, houseAddress, idCardType, idCardNumber,
    } = req.body;
    const args = [firstName, lastName, email, password, confirmPassword, typeOfUser,
      mobileNo, houseAddress, idCardType, idCardNumber];
    const reqdFieldsDescription = getRequiredDetails(typeOfAccountToBeCreated, ...args);
    const createAcct = await configureCreateAcctMiddlewares(typeOfCreator, typeOfAccountToBeCreated,
      reqdFieldsDescription, ...args);
    runMiddlewares(createAcct, req, res);
  };
  return getAndPersistReqProps;
};

export default initAnyUserTypeAcctCreator;
