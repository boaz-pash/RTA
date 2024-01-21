import { postgraphile } from 'postgraphile';
import { config } from 'dotenv';

config();

const databaseURL = process.env.DB_URL;


const postgraphileMiddleware = postgraphile(databaseURL, 'auth_schema', {
  watchPg: true,
  enhanceGraphiql: true,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtPgTypeIdentifier:'auth_schema.jwt_token',
  graphiql: true,
});

export default postgraphileMiddleware;
          