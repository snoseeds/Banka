import initValidateFields from '../middlewares/validateFormFields';
import initValidateUserType from '../middlewares/validateUserType';
import initPasswordsMatch from '../middlewares/checkPasswordsMatch';
import initCheckUserUniquenessInDB from '../middlewares/checkUserUniquenessInDB';
import initAddToDatabase from '../middlewares/addToDatabase';
import initCheckUserInDb from '../middlewares/checkUserInDb';
import initAuthenticateUserType from '../middlewares/authenticateUserType';

const configureCreateAcctMiddlewares = (typeOfCreator, typeOfAccountToBeCreated,
  reqdFieldsDescription, firstName, lastName, email, password, confirmPassword, typeOfUser,
  mobileNo, houseAddress, idCardType, idCardNumber) => {
  let checkRootAdminOrAdminDetailsMiddlewares = [];
  if (typeOfAccountToBeCreated === 'admin' || typeOfAccountToBeCreated === 'cashier') {
    checkRootAdminOrAdminDetailsMiddlewares = [
      initAuthenticateUserType(typeOfCreator),
      initCheckUserInDb(),
    ];
  }
  // Populating conditional arguments for initCheckUserUniquenessInDB
  const [uniqueFieldsValues, uniqueFieldsDescription] = typeOfAccountToBeCreated === 'client'
    ? [[email], { Email: 'email' }]
    : [[email, mobileNo, idCardNumber],
      { Email: 'email', 'Mobile number': 'mobileNo', 'ID Card Number': 'idCardNumber' }];

  const createAcctMiddlewaresArr = [
    ...checkRootAdminOrAdminDetailsMiddlewares,
    initValidateFields(reqdFieldsDescription),
    initValidateUserType(typeOfAccountToBeCreated, typeOfUser),
    initPasswordsMatch(password, confirmPassword),
    initCheckUserUniquenessInDB(typeOfAccountToBeCreated, uniqueFieldsValues,
      uniqueFieldsDescription),
    initAddToDatabase(typeOfAccountToBeCreated, firstName, lastName, email,
      password, mobileNo, houseAddress, idCardType, idCardNumber),
  ];
  return createAcctMiddlewaresArr;
};

export default configureCreateAcctMiddlewares;
