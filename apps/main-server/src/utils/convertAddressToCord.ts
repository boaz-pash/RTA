import axios from 'axios';
import {config} from 'dotenv';

config();
const convertAddressToCord = async (address: string) => {
  const cord = await axios(
    `https://geocode.maps.co/search?q=${address}&api_key=65acdf810add7069166591gncf84855`
  );
  console.log([cord.data[0].lat,cord.data[0].lon]);
  return [cord.data[0].lon,cord.data[0].lat];
};
export default convertAddressToCord; 