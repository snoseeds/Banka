import initJobsToBeCarriedOut from '../middlewares/jobsToBeCarriedOut';
import viewTransactxnsByAcctNoWrapper from '../middlewares/viewTransactxnsByAcctNo';
import viewTransactxnByIdWrapper from '../middlewares/viewTransactxnById';
import viewBankAccountsByEmailWrapper from '../middlewares/viewBankAccountsByEmail';

const clientsStaffsAndAdmins = {
  viewTransactxnsByAcctNo: initJobsToBeCarriedOut(viewTransactxnsByAcctNoWrapper),
  viewTransactxnById: initJobsToBeCarriedOut(viewTransactxnByIdWrapper),
  viewBankAcctsByEmail: initJobsToBeCarriedOut(viewBankAccountsByEmailWrapper),
};

export default clientsStaffsAndAdmins;
