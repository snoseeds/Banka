import initJobsToBeCarriedOut from '../middlewares/jobsToBeCarriedOut';
import changeAcctStatusInDbWrapper from '../middlewares/changeAcctStatusInDB';
import deleteBankAcctInDbWrapper from '../middlewares/deleteBankAcctInDb';
import initViewAnyResourceInDb from '../middlewares/viewAnyResourceInDb';

const staffAndAdmin = {
  changeBankAcctStatus: initJobsToBeCarriedOut(changeAcctStatusInDbWrapper),
  deleteBankAcct: initJobsToBeCarriedOut(deleteBankAcctInDbWrapper),
  viewBankAcctsByQueryProp: initJobsToBeCarriedOut(initViewAnyResourceInDb('query', 'account',
    ['createdOn', 'accountNumber', 'email', 'type', 'status', 'accountBalance'],
    ['createdOn', 'accountNumber', 'ownerEmail', 'type', 'status', 'balance'])),
};

export default staffAndAdmin;
