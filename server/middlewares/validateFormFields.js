import issueErrorResponse from '../helpers/issueErrorResponse';
/**
 * Tests form fields that are required
 * @param [array] requiredFields - variable names of form fields to be validated
 * @param {object} reqdFieldsDescription - number keys
 * with values as user intelligible description of form fields
 * @param {object} response express response object
 *
 * @returns {json} error status code with and object having status code and error string
 * if there's error or undefined if not
 */

const initValidateFields = (reqdFieldsDescription) => {
  // eslint-disable-next-line consistent-return
  const validateFormFields = (request, response, next) => {
    let idx = -1;
    if (Object.values(reqdFieldsDescription).some((inputField) => {
      idx += 1;
      return !inputField;
    })) {
      return issueErrorResponse(response, 400, `${Object.keys(reqdFieldsDescription)[idx]} is required`);
    }
    next();
  };
  return validateFormFields;
};

export default initValidateFields;
