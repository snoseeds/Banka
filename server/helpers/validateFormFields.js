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
const validateFormFields = (requiredFields, reqdFieldsDescription, response) => {
  let idx = 0;
  if (requiredFields.some((inputField) => {
    idx += 1;
    return !inputField;
  })) {
    return response.status(400).json({
      status: 400,
      error: `${reqdFieldsDescription[idx]} is required`,
    });
  }
  return undefined;
};

export default validateFormFields;
