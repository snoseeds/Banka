import changeAcctStatusInDbWrapper from '../middlewares/changeAcctStatusInDB';
import deleteBankAcctInDbWrapper from '../middlewares/deleteBankAcctInDb';
import initJobsToBeCarriedOut from '../middlewares/jobsToBeCarriedOut';

const staffAndAdmin = {
  changeBankAcctStatus: initJobsToBeCarriedOut(changeAcctStatusInDbWrapper),

  deleteBankAcct: initJobsToBeCarriedOut(deleteBankAcctInDbWrapper),
};

export default staffAndAdmin;
