import { Router } from 'express';
import Index from '../controllers';
import user from '../controllers/userController';
import rootAdmin from '../controllers/rootAdminController';
import admin from '../controllers/adminController';
import staff from '../controllers/staffController';
import staffAndAdmin from '../controllers/staffAndAdminController';
import clientsStaffsAndAdmins from '../controllers/clientsStaffsAndAdminsController';
import initProcessReqOfBankAcct from '../middlewares/processReqOfBankAcct';

const router = Router();

const routes = (app) => {
  router.get('/', Index.home);
  router.get('/api/v1', Index.v1);
  // Signup routes
  router.post('/api/v1/auth/signup', user.signup);
  // Signin routes
  router.post('/api/v1/auth/signin', user.signin);
  // Client create bank account route
  router.post('/api/v1/accounts', user.createBankAccount[0]);
  // Root Admin Signup route
  router.post('/api/v1/auth/root-admin/signup', rootAdmin.signup);
  // Root Admin Signin route
  router.post('/api/v1/auth/root-admin/signin', rootAdmin.signin);
  // Root Admin can create Admin account
  router.post('/api/v1/auth/root-admin/create-admin-acct', rootAdmin.createAdminAcct);
  // Admin can create Admin account
  router.post('/api/v1/auth/admin/create-admin-acct', admin.createAdminAcct);
  // Admin Signin route
  router.post('/api/v1/auth/admin/signin', admin.signin);
  // Admin can create Staff account
  router.post('/api/v1/auth/admin/create-staff-acct', admin.createStaffAcct);
  // Staff Signin route
  router.post('/api/v1/auth/staff/signin', staff.signin);
  // Admin or Staff can activate or deactivate a bank account
  router.patch('/api/v1/accounts/:accountNumber',
    initProcessReqOfBankAcct('admin', 'cashier'), staffAndAdmin.changeBankAcctStatus);
  // Admin or Staff can delete a bank account
  router.delete('/api/v1/accounts/:accountNumber',
    initProcessReqOfBankAcct('admin', 'cashier'), staffAndAdmin.deleteBankAcct);
  // Staff can credit a bank account
  router.post('/api/v1/transactions/:accountNumber/credit',
    initProcessReqOfBankAcct('cashier'), staff.creditBankAcct);
  // Staff can debit a bank account
  router.post('/api/v1/transactions/:accountNumber/debit',
    initProcessReqOfBankAcct('cashier'), staff.debitBankAcct);
  // Client, Staff, and Admin can get transactions of a bank account
  router.get('/api/v1/accounts/:accountNumber/transactions',
    initProcessReqOfBankAcct('client', 'cashier', 'admin'), clientsStaffsAndAdmins.viewAcctNoTransactxns);

  router.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: 'This endpoint doesn\'t exist on this server',
    });
  });

  app.use(router);
};

export default routes;
