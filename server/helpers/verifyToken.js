import jwt from 'jsonwebtoken';

const verifyToken = (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    return `Failed to authenticate token because of error: ${e}`;
  }
};

export default verifyToken;
