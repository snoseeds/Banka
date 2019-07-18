import queries from '../PostgreSQL/dbTablesCrudQueries';

// const initGetBankAcctDetails = (accountNumber) => {
//   const getBankAcctDetails = async (req, res, next) => {
//     try {
//       const [accountDetails] = await queries.getRowsOfColumns('account', ['*'], 'accountNumber', accountNumber);
//       if (accountDetails) {
//         req.bankAccountDetails = accountDetails;
//         return next;
//       }
//       const errorObject = {
//         name: 404,
//         message: 'This account number doesn\'t exist on Banka',
//       };
//       throw errorObject;
//     } catch (error) {
//       throw error;
//     }
//   };
//   return getBankAcctDetails;
// };

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
