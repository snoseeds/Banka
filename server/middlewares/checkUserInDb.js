import Database from '../models/Database';
import issueErrorResponse from '../helpers/issueErrorResponse';

const initCheckUserInDb = (email = null) => {
  const checkUserInDb = (req, res, next) => {
    let user;
    switch (email) {
      case null:
        user = Database[req.body.typeOfUser].find(recd => recd.email === req.authEmail);
        break;
      default:
        user = Database[req.body.typeOfUser].find(recd => recd.email === email);
        break;
    }
    if (user) {
      req.user = user;
      return next();
    }
    return issueErrorResponse(res, 403, 'User with this email doesn\'t exist');
  };
  return checkUserInDb;
};

export default initCheckUserInDb;
