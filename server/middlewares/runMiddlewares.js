import async from 'async';
import issueErrorResponse from '../helpers/issueErrorResponse';

const runMiddlewares = (middlewaresArray, req, res) => {
  async.series(middlewaresArray.map(mw => mw.bind(null, req, res)))
    .catch(err => issueErrorResponse(res, 500, `${err.name}: ${err.message}`));
};

export default runMiddlewares;
