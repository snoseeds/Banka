const getRequiredDetails = (typeOfAccountToBeCreated, firstName, lastName, email, password,
  confirmPassword, typeOfUser, mobileNo, houseAddress, idCardType, idCardNumber) => {
  const basicDetails = {
    'First name': firstName,
    'Last name': lastName,
    Email: email,
    Password: password,
    'Type of user': typeOfUser,
    'Mobile Number': mobileNo,
  };
  if (typeOfAccountToBeCreated === 'client') {
    return { ...basicDetails };
  }
  const extendedDetails = {
    'House Address': houseAddress,
    'ID Card Type': idCardType,
    'ID Card Number': idCardNumber,
  };
  return { ...basicDetails, ...extendedDetails };
};

export default getRequiredDetails;
