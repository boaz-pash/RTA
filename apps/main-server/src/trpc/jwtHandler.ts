import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();
const secret = process.env.JWT_SECRET_KEY;
const decodeAndVerifyJwtToken = async (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
export default decodeAndVerifyJwtToken;
