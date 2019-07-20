import queries from '../PostgreSQL/dbTablesCrudQueries';

const initGetBankaParameterDetails = (table, paramName, paramValue, paramDescription) => {
  const getBankaParameterDetails = async (req, res, next) => {
    try {
      const [paramDetails] = await queries.getRowsOfColumns(table, ['*'], paramName, paramValue);
      if (paramDetails) {
        req.paramDetails = paramDetails;
        return next;
      }
      const errorObject = {
        name: 404,
        message: `This ${paramDescription} doesn't exist on Banka`,
      };
      throw errorObject;
    } catch (error) {
      throw error;
    }
  };
  return getBankaParameterDetails;
};

export default initGetBankaParameterDetails;
