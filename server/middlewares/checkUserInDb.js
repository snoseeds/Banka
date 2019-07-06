import queries from '../PostgreSQL/dbTablesCrudQueries';

const initCheckUserInDb = (email = null) => {
  const checkUserInDb = async (req, res, next) => {
    try {
      let user;
      switch (email) {
        case null:
          [user] = await queries.getRowsOfColumns(req.body.typeOfUser, ['*'], 'email', req.authEmail);
          break;
        default:
          [user] = await queries.getRowsOfColumns(req.body.typeOfUser, ['*'], 'email', email);
          break;
      }
      if (user) {
        console.log(user);
        req.user = user;
        return next;
      }
      const errorObject = {
        name: 403,
        message: 'User with this email doesn\'t exist',
      };
      throw errorObject;
    } catch (error) {
      throw error;
    }
  };
  return checkUserInDb;
};

export default initCheckUserInDb;
