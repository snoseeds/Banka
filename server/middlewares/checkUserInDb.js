import Database from '../models/Database';

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
    return res.status(403).json({
      status: 403,
      error: 'User with this email doesn\'t exist',
    });
  };
  return checkUserInDb;
};

export default initCheckUserInDb;
