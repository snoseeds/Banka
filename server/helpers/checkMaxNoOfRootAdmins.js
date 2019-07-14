import queries from '../PostgreSQL/dbTablesCrudQueries';

const checkMaxNoOfRootAdmins = async (typeOfUser) => {
  try {
    if (typeOfUser === 'rootAdmin') {
      const noOfRootAdmins = await queries.getRowsCount('rootAdmin');
      if (noOfRootAdmins + 1 === 4) {
        const errorObject = {
          name: 403,
          message: 'Not Authorized',
        };
        throw errorObject;
      }
    }
  } catch (error) {
    throw error;
  }
};

export default checkMaxNoOfRootAdmins;
