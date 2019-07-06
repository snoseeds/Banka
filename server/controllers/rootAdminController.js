import initAnyUserTypeAcctCreator from '../middlewares/anyUserTypeAcctCreator';
import initSignInAnyUserType from '../middlewares/signInAnyUserType';

const rootAdmin = {
  signup: initAnyUserTypeAcctCreator(null, 'rootAdmin'),

  signin: initSignInAnyUserType('rootAdmin'),

  createAdminAcct: initAnyUserTypeAcctCreator('rootAdmin', 'admin'),
};

export default rootAdmin;
