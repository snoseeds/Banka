const makeSysVars = (noOfVars, start = 0) => Array(noOfVars).fill('')
  .map((v, i) => `$${i + start + 1}`).join(', ');

export default makeSysVars;
