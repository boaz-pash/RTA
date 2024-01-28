// import { Link } from "react-router-dom"
// import { trpc } from "../../utils/trpc";

// const ListView = ()=>{
//     const eventQuery = trpc.queries.events.useQuery();
//     console.log(eventQuery.data);
// return(
//     <>
//     {eventQuery.data?.map(event => {
//         console.log(event.event_id);
//         return(
//             <div key={event.event_id}>
//                 <h1>{event.event_name}</h1>
//                 <p>{event.event_description}</p>
//                 <p>{event.event_date}</p>
//                 {/* <p>{event.event_time}</p> */}
//                 <p>{event.event_location}</p>
//             </div>
//         )
//     })}
//     <div className="flex">
//           <div className="w-1/2 pr-8">
//             {/* Map View */}
//             {/* ... (unchanged) */}
//             <Link to="/map-view" className="text-blue-500 hover:underline">
//             Map View
//           </Link>
//           </div>
//           <div className="w-1/2">
//             {/* List View */}
//             {/* ... (unchanged) */}
//             <Link to="/list-view" className="text-blue-500 hover:underline">
//             List View
//           </Link>
//           </div>
//         </div></>
// )
// }

// export default ListView;

import React from 'react';
import { Link } from 'react-router-dom';
import { trpc } from '../../utils/trpc';
// import trpc from 'path-to-your-trpc-package'; // Update the path

const ListView = () => {
  const eventQuery = trpc.queries.events.useQuery();

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Event List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventQuery.data?.map((event) => (
          <div key={event.event_id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-2">{event.event_name}</h3>
            <p className="text-gray-600 mb-2">{event.event_description}</p>
            <p className="text-gray-600 mb-2">
              Date: {new Date(event.event_date).toLocaleDateString()}
            </p>
            {/* Uncomment the line below if event_time is available */}
            {/* <p className="text-gray-600 mb-2">Time: {event.event_time}</p> */}
            <p className="text-gray-600 mb-2">Location: {event.event_location}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <Link to="/map-view" className="text-blue-500 hover:underline">
          Map View
        </Link>
        <Link to="/list-view" className="text-blue-500 hover:underline">
          List View
        </Link>
      </div>
    </div>
  );
};

export default ListView;
