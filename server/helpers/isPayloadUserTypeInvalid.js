const isPayloadUserTypeInvalid = (payload, typeOfUser1, typeOfUser2) => {
  if (typeOfUser2) {
    return payload.typeOfUser !== `${typeOfUser1}` && payload.typeOfUser !== `${typeOfUser2}`;
  }
  return payload.typeOfUser !== `${typeOfUser1}`;
};

export default isPayloadUserTypeInvalid;
