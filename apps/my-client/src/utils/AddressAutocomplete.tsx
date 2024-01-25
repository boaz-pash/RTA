import { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

interface AddressAutocompleteProps {
  onSelect: (selectedAddress: {
    address: string;
    latLng: { lat: number; lng: number };
  }) => void;
}
interface Coordinates {
  lat: number;
  lng: number;
}

const AddressAutocomplete = (props: AddressAutocompleteProps) => {
  const [address, setAddress] = useState<string>('');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const handleSelect = async (selected: string) => {
    try {
      const results = await geocodeByAddress(selected);
      const latLng = await getLatLng(results[0]);
      console.log(results);

      setAddress(selected);
      setCoordinates(latLng);
      props.onSelect({ address: selected, latLng });
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        //     <AddressAutocomplete onSelect={handleAddressSelect} />
        //     {/* <input

        //       type="text"
        //       name="event_location"
        //       value={eventData.event_location}
        //       onChange={handleChange}
        //       className="border rounded w-full py-2 px-3"
        //     /> */}
        //   </div>
        <div className="mb-4">
          {/* <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Location:
          </label> */}
          <input
            // type="text"
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AddressAutocomplete;
