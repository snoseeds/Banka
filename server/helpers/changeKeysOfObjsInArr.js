const changeKeysOfObjsInArr = (arrOfObjs, arrOfNewKeys) => arrOfObjs.map(obj => Object.values(obj)
  .reduce((newObj, val, idx) => ({ ...newObj, [arrOfNewKeys[idx]]: val }), {}));

export default changeKeysOfObjsInArr;
