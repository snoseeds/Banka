import initJobsToBeCarriedOut from '../middlewares/jobsToBeCarriedOut';
import changeAcctStatusInDbWrapper from '../middlewares/changeAcctStatusInDB';
import deleteBankAcctInDbWrapper from '../middlewares/deleteBankAcctInDb';

const staffAndAdmin = {
  changeBankAcctStatus: initJobsToBeCarriedOut(changeAcctStatusInDbWrapper),
  deleteBankAcct: initJobsToBeCarriedOut(deleteBankAcctInDbWrapper),
};

export default staffAndAdmin;
