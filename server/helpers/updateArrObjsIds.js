const updateArrObjsIds = (arr, objProp) => arr.map((v, i) => ({ ...v, [objProp]: i + 1 }));

export default updateArrObjsIds;
