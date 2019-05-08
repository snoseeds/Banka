// Generating unique nine digits account number by getting and joining the first six characters
// of email and the first three characters of first name, getting the charCode (number) of each,
// adding up three consecutive charCodes, which would always give a three digit value,
// and joining the three 3 digits values into a string to form nine digits string.
const generateAcctNo = (email, fName) => Number(`${email.slice(0, 6)}${fName.slice(0, 3)}`.split('')
  .map(char => char.charCodeAt(0))
  .reduce((acc, item, idx) => {
    if (idx + 1 === 6 || idx + 1 === 3) {
      acc[acc.length - 1] += item;
      acc[acc.length] = 0;
    } else {
      acc[acc.length - 1] += item;
    }
    return acc;
  }, [0]).join(''));

export default generateAcctNo;
