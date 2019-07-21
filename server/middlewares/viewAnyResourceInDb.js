import queries from '../PostgreSQL/dbTablesCrudQueries';

const initViewAnyResource = (requestPropToUse, table, columnsToBeRequestedArr,
  arrOfNamesForReturnedCols) => {
  // queries the DB with any single query or params property and value
  // from query string object or params object, or queries the whole DB table if
  // the endpoint /accounts does not have any query string, error must have been
  // returned for an empty params object because params properties values are expected
  // to exist in their respective tables unlike query properties whose values can be 
  // absent, moreso for the case for even a path without query string (view all bank accts)
  const viewAnyResourceWrapper = () => {
    const viewAnyResource = async (req, res) => {
      const queryType = Object.keys(req[requestPropToUse])[0];
      const queryValue = Object.values(req[requestPropToUse])[0];
      return res.status(200).json({
        status: 200,
        data: await queries.getRowsOfColumns(table, columnsToBeRequestedArr,
          queryType, queryValue, arrOfNamesForReturnedCols),
      });
    };
    return [viewAnyResource];
  };
  return viewAnyResourceWrapper;
};

export default initViewAnyResource;
