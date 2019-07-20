import initJobsToBeCarriedOut from '../middlewares/jobsToBeCarriedOut';
import changeAcctStatusInDbWrapper from '../middlewares/changeAcctStatusInDB';
import deleteBankAcctInDbWrapper from '../middlewares/deleteBankAcctInDb';
import viewAllBankAcctsWrapper from '../middlewares/viewAllBankAcctsInDb';

const staffAndAdmin = {
  changeBankAcctStatus: initJobsToBeCarriedOut(changeAcctStatusInDbWrapper),
  deleteBankAcct: initJobsToBeCarriedOut(deleteBankAcctInDbWrapper),
  viewAllBankAccts: initJobsToBeCarriedOut(viewAllBankAcctsWrapper),
};

export default staffAndAdmin;
