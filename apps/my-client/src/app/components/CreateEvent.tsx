import React, { useState } from 'react';
import { trpc } from '../../utils/trpc';
// import { trpc } from 'utils/trpc';
// import { useMutation } from '@trpc/client/react';
// import { eventSchema } from 'zVelidation';
interface eventSchema {
  event_name: string;
  event_description: string | undefined;
  event_location: string | undefined;
  event_date: Date;
}
const CreateEventForm: React.FC = () => {
  const [eventData, setEventData] = useState({
    event_name: '',
    event_description: '',
    event_location: '',
    event_date: '', // Set the user ID based on your authentication logic
  });

  const { data, error, isLoading, mutate } =
    trpc.mutations.createEvent.useMutation();

  const handleCreateEvent = async () => {
    try {
      mutate(eventData);
      // Optionally, you can reset the form or perform other actions after the mutation succeeds
      console.log('Event created successfully!', eventData);
    } catch (mutationError) {
      console.error('Error creating event:', mutationError);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Event</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Name:
          </label>
          <input
            type="text"
            name="event_name"
            value={eventData.event_name}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Description:
          </label>
          <input
            type="text"
            name="event_description"
            value={eventData.event_description}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Location:
          </label>
          <input
            type="text"
            name="event_location"
            value={eventData.event_location}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Date:
          </label>
          <input
            type="datetime-local"
            name="event_date"
            value={eventData.event_date}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <button
          type="button"
          onClick={handleCreateEvent}
          disabled={isLoading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
      {isLoading && <p className="mt-4 text-gray-600">Creating event...</p>}
      {error && (
        <p className="mt-4 text-red-600">
          Error creating event: {error.message}
        </p>
      )}
      {data && (
        <p className="mt-4 text-green-600">Event created successfully!</p>
      )}
    </div>
  );
};

export default CreateEventForm;
