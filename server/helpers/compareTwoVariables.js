const compareTwoVariables = (varA, varB, errCode, errMessage) => {
  if (varA !== varB) {
    const errorObject = {
      name: errCode,
      message: errMessage,
    };
    throw errorObject;
  }
};

export default compareTwoVariables;
