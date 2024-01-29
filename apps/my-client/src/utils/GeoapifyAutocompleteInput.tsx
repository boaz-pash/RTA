// import React, { useState, ChangeEvent } from 'react';
// // import {config} from 'dotenv';

// // config();

// // interface GeoapifyAutocompleteInputProps {
// //   apiKey: string;
// // }

// interface Suggestion {
//   properties: {
//     id: string;
//     address_line1: string;
//     city: string;
//     country: string;
//   };
// }
// // const apiKey = process.env.ADRESSS_AUTOCOMPLATE_API_KEY;
// const apiKey = 'ff85964e20424baa826a85ee960bdf8c';
// const GeoapifyAutocompleteInput: React.FC = () => {
//   const [inputValue, setInputValue] = useState<string>('');
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
//     const text = e.target.value;
//     setInputValue(text);

//     if (text.trim() === '') {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(
//         `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${apiKey}`
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch suggestions');
//       }

//       const data: { features: Suggestion[] } = await response.json();
//       setSuggestions(data.features);
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//       setSuggestions([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const onSelect = (s: string) => {
//     setInputValue(s);
//   };
//   return (
//     <div>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         placeholder="Type to search..."
//         className="border rounded w-full py-2 px-3"
//       />
//       {loading && <div className="text-gray-600 mt-2">Loading...</div>}
//       <div className="autocomplete-dropdown-container">
//         {suggestions.map((suggestion) => {
//           const addres =
//             suggestion.properties.address_line1 +
//             ' ' +
//             suggestion.properties.city +
//             ' ' +
//             suggestion.properties.country;

//           return (
//             <div
//               key={suggestion.properties.id}
//               className="suggestion-item"
//               onClick={() => onSelect(addres)}
//             >
//               <span>{addres}</span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default GeoapifyAutocompleteInput;


// import { Address } from ;
import React, { useState, ChangeEvent, useEffect } from 'react';

interface GeoapifyAutocompleteInputProps {
  // apiKey: string;
  onSelect: (selectedAddress: string) => void;
}

interface Suggestion {
  properties: {
    id: string;
    address_line1: string;
    city: string;
    country: string;
  };
}
const apiKey = "ff85964e20424baa826a85ee960bdf8c"
const GeoapifyAutocompleteInput: React.FC<GeoapifyAutocompleteInputProps> = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Clear suggestions when the component unmounts
    return () => {
      setSuggestions([]);
    };
  }, []);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);

    if (text.trim() === '') {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data: { features: Suggestion[] } = await response.json();
      setSuggestions(data.features);
      setError(null);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setError('Failed to fetch suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (selectedAddress: string) => {
    // Step 1: Call the onSelect prop with the selected address
    onSelect(selectedAddress);
    // Step 2: Optionally, clear suggestions and input value
    setSuggestions([]);
    setInputValue('');
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
        className="border rounded w-full py-2 px-3"
      />
      {loading && <div className="text-gray-600 mt-2">Loading...</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
      <div className="autocomplete-dropdown-container">
        {suggestions.map((suggestion) => {
          const address =
            suggestion.properties.address_line1 +
            ' ' +
            suggestion.properties.city +
            ' ' +
            suggestion.properties.country;

          return (
            <div
              key={suggestion.properties.id}
              className="suggestion-item"
              // Step 3: Call handleSelect when a suggestion is clicked
              onClick={() =>{ handleSelect(address);setInputValue(address)}}
            >
              <span>{address}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeoapifyAutocompleteInput;

