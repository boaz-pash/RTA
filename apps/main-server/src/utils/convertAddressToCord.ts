import axios from 'axios';
// import {config} from 'dotenv';

// config();
const apiKey = "65acdf810add7069166591gncf84855"
const convertAddressToCord = async (address: string) => {
  console.log("address:",address);
  
  const cord = await axios(
    `https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`
  );
  // console.log(cord);
  
  console.log([cord.data[0].lat,cord.data[0].lon]);
  return [cord.data[0].lon,cord.data[0].lat];
};
export default convertAddressToCord; 