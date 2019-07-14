import async from 'async';
import issueErrorResponse from '../helpers/issueErrorResponse';

const runMiddlewares = (middlewaresArray, req, res) => {
  async.series(middlewaresArray.map((mw) => {
    if (mw.constructor.name === 'AsyncFunction') {
      return async.asyncify(mw.bind(null, req, res));
    }
    return mw.bind(null, req, res);
  }))
    .catch((err) => {
      // console.log(`${err.name}: ${err.message}`);
      if (typeof err.name === 'number') {
        return issueErrorResponse(res, err.name, `${err.message}`);
      }
      return issueErrorResponse(res, 500, `${err.name}: ${err.message}`);
    });
};

export default runMiddlewares;
