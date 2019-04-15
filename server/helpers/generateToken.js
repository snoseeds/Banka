import jwt from 'jsonwebtoken';

const secretKey = 'andela';

const generateToken = payload => jwt.sign(payload, secretKey, { expiresIn: '1week' });

export default generateToken;
