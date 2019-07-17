const isPayloadUserTypeInvalid = (payload, typeOfUsersCategoriesArr, errCode, errMessage) => {
  if (!typeOfUsersCategoriesArr.some(userCategory => payload.typeOfUser === userCategory)) {
    const errorObject = {
      name: errCode,
      message: errMessage,
    };
    throw errorObject;
  }
};

export default isPayloadUserTypeInvalid;
