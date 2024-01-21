import axios from 'axios';
const convertAddressToCord = async (address: string) => {
  const cord = await axios(
    `https://geocode.maps.co/search?q=${address}&api_key=65acdf810add7069166591gncf84855`
  );
  console.log(cord.data);
  
  return cord.data;
};
export default convertAddressToCord;