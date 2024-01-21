import express from 'express';
import { config } from 'dotenv';
import postgraphileMiddleware from './postgraphile';
import cors from 'cors';
config();


const app = express();  
app.use(cors());
app.use(express.json());  
app.use(postgraphileMiddleware);

const port = 7777; 
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/graphiql`);
});
server.on('error', console.error);             