import async from 'async';
import configureCreateAcctMiddlewares from '../helpers/configureCreateAcctMiddlewares';
import getRequiredDetails from '../helpers/getRequiredDetails';

const initAnyUserTypeAcctCreator = (typeOfCreator, typeOfAccountToBeCreated) => {
  const getAndPersistReqProps = (req, res) => {
    const {
      firstName, lastName, email, password, confirmPassword, typeOfUser,
      mobileNo, houseAddress, idCardType, idCardNumber,
    } = req.body;
    const args = [firstName, lastName, email, password, confirmPassword, typeOfUser,
      mobileNo, houseAddress, idCardType, idCardNumber];
    const reqdFieldsDescription = getRequiredDetails(typeOfAccountToBeCreated, ...args);
    const createAcct = configureCreateAcctMiddlewares(typeOfCreator, typeOfAccountToBeCreated,
      reqdFieldsDescription, ...args);
    // eslint-disable-next-line consistent-return
    async.series(createAcct.map(mw => mw.bind(null, req, res)));
  };
  return getAndPersistReqProps;
};

export default initAnyUserTypeAcctCreator;
