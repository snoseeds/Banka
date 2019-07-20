// Generating unique ten digits account number by getting and joining the first three characters
// of email and the first three characters of firstName, getting the charCode (number) of each,
// adding up three consecutive charCodes, which would always give a three digit value,
// and joining the two 3 digits values into a string to form six digits string, whose first digit
// is removed to have five single digits.
// A random single digit between 1 (not zero to prevent the possibility of leading zeros) and 9
// is then inserted into a random index (from 0 to the increasing max index of the array 4 - 9)
// five times to come up with the account number

const generateAcctNo = (email, firstName) => {
  const baseArr = `${email.slice(0, 3)}${firstName.slice(0, 3)}`.split('')
    .map(char => char.charCodeAt(0))
    .reduce((acc, item, idx) => {
      if (idx + 1 === 3) {
        acc[acc.length - 1] += item;
        acc[acc.length] = 0;
      } else {
        acc[acc.length - 1] += item;
      }
      return acc;
    }, [0]);
  const baseArrOfLengthFive = baseArr.join('').split('').slice(1);
  const insertLengthTimes = (arr) => {
    const arrOfDoubleLength = arr.reduce((acc) => {
      acc.splice(Math.floor(Math.random() * acc.length), 0, Math.ceil(Math.random() * 9));
      return acc;
    }, arr);
    return Number(arrOfDoubleLength.join(''));
  };

  const uniqueBankAcctNo = insertLengthTimes(baseArrOfLengthFive);
  return uniqueBankAcctNo;
}

export default generateAcctNo;
