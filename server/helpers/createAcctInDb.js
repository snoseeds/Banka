import bcrypt from 'bcrypt';
import Database from '../models/Database';
import Client from '../models/Client';
import Cashier from '../models/Cashier';
import Admin from '../models/Admin';
import RootAdmin from '../models/RootAdmin';

const salt = bcrypt.genSaltSync(10);

const createAcctInDb = (typeOfUser, firstName, lastName, email, password,
  mobileNo, houseAddress, idCardType, idCardNumber) => {
  const basicDetails = {
    id: Database[typeOfUser].length + 1, firstName, lastName, email,
  };
  if (typeOfUser === 'client') {
    Database[typeOfUser].push(new Client(...Object.values(basicDetails),
      bcrypt.hashSync(password, salt)));
    return { ...basicDetails };
  }
  const typeOfInternalUsers = { cashier: Cashier, admin: Admin, rootAdmin: RootAdmin };
  const extendedDetails = {
    mobileNo, houseAddress, idCardType, idCardNumber,
  };
  Database[typeOfUser].push(new typeOfInternalUsers[typeOfUser](...Object.values(basicDetails),
    bcrypt.hashSync(password, salt), ...Object.values(extendedDetails)));
  return { ...basicDetails, ...extendedDetails };
};

export default createAcctInDb;
