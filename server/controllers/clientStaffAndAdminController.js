import initJobsToBeCarriedOut from '../middlewares/jobsToBeCarriedOut';
import viewTransactxnsByAcctNoWrapper from '../middlewares/viewTransactxnsByAcctNo';
import viewTransactxnByIdWrapper from '../middlewares/viewTransactxnById';
import viewBankAccountsByEmailWrapper from '../middlewares/viewBankAccountsByEmail';
import viewBankAccountByAcctNoWrapper from '../middlewares/viewBankAccountByAcctNo';

const clientStaffAndAdmin = {
  viewTransactxnsByAcctNo: initJobsToBeCarriedOut(viewTransactxnsByAcctNoWrapper),
  viewTransactxnById: initJobsToBeCarriedOut(viewTransactxnByIdWrapper),
  viewBankAcctsByClientEmail: initJobsToBeCarriedOut(viewBankAccountsByEmailWrapper),
  viewBankAcctByAcctNo: initJobsToBeCarriedOut(viewBankAccountByAcctNoWrapper),
};

export default clientStaffAndAdmin;
