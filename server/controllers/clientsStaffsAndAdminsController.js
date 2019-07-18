import viewTransactxnsByAcctNoWrapper from '../middlewares/viewTransactxnsByAcctNo';
import viewTransactxnByIdWrapper from '../middlewares/viewTransactxnById';
import initJobsToBeCarriedOut from '../middlewares/jobsToBeCarriedOut';

const clientsStaffsAndAdmins = {
  viewTransactxnsByAcctNo: initJobsToBeCarriedOut(viewTransactxnsByAcctNoWrapper),
  viewTransactxnById: initJobsToBeCarriedOut(viewTransactxnByIdWrapper),
};

export default clientsStaffsAndAdmins;
