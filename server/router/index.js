import { Router } from 'express';
import Index from '../controllers';
import user from '../controllers/userController';
import rootAdmin from '../controllers/rootAdminController';
import admin from '../controllers/adminController';


const router = Router();

// router.get('/', (req, res) => {
//   res.send('hello tdd');
// });

const routes = () => {
  router.get('/', Index.home);
  router.get('/api/v1', Index.v1);
  // Signup routes
  router.post('/api/v1/auth/signup', user.signup[0]);
  // Signin routes
  router.post('/api/v1/auth/signin', user.signin[0]);
  // Client create bank account route
  router.post('/api/v1/accounts', user.createBankAccount[0]);
  // Root Admin Signup routes
  router.post('/api/v1/auth/root-admin/signup', rootAdmin.signup[0]);
  // Root Admin can create Admin account
  router.post('/api/v1/auth/root-admin/create-admin-acct', rootAdmin.createAdminAcct[0]);
  // Admin can create Admin account
  router.post('/api/v1/auth/admin/create-admin-acct', admin.createAdminAcct[0]);
};

routes();

export default router;
