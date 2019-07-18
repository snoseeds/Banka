import viewAcctNoTransactxnsWrapper from '../middlewares/viewAcctNoTransactxns';
import initJobsToBeCarriedOut from '../middlewares/jobsToBeCarriedOut';

const clientsStaffsAndAdmins = {
  viewAcctNoTransactxns: initJobsToBeCarriedOut(viewAcctNoTransactxnsWrapper),
};

export default clientsStaffsAndAdmins;
