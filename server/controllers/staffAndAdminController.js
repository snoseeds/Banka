import async from 'async';
import changeAcctStatusInDb from '../middlewares/changeAcctStatusInDB';
import deleteBankAcctInDb from '../middlewares/deleteBankAcctInDb';

// import moment from 'moment';

// import pool from '../models/database';

const staffAndAdmin = {
  changeBankAcctStatus(req, res) {
    // eslint-disable-next-line consistent-return
    async.series([...req.middlewaresArr, changeAcctStatusInDb].map(mw => mw.bind(null, req, res)));
  },

  deleteBankAcct(req, res) {
    // eslint-disable-next-line consistent-return
    async.series([...req.middlewaresArr, deleteBankAcctInDb].map(mw => mw.bind(null, req, res)));
  },
};

export default staffAndAdmin;
