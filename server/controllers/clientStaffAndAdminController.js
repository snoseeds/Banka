import initJobsToBeCarriedOut from '../middlewares/jobsToBeCarriedOut';
import initViewAnyResourceInDb from '../middlewares/viewAnyResourceInDb';

const clientStaffAndAdmin = {
  viewTransactxnsByParamsProp: initJobsToBeCarriedOut(initViewAnyResourceInDb('params', 'transaction',
    ['id', 'createdOn', 'transactionType', 'accountNumber', 'amount', 'oldBalance', 'newBalance'],
    ['transactionId', 'createdOn', 'type', 'accountNumber', 'amount', 'oldBalance', 'newBalance'])),

  viewBankAcctsByParamsProp: initJobsToBeCarriedOut(initViewAnyResourceInDb('params', 'account',
    ['createdOn', 'accountNumber', 'email', 'type', 'status', 'accountBalance'],
    ['createdOn', 'accountNumber', 'ownerEmail', 'type', 'status', 'balance'])),
};

export default clientStaffAndAdmin;
