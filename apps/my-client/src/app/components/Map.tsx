import { useEffect, useState } from 'react';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { RFeature, RLayerVector, RMap, ROSM, ROverlay, RStyle } from 'rlayers';
import icon from '../../utils/svg/monument';
import { trpc } from '../../utils/trpc';
import { Data } from 'ws';
import { Link } from 'react-router-dom';

type Location = {
  id: string | number;
  coordinates: [number];
};
const MapWithIcons = () => {
  const [iconLocations, setIconLocations] = useState<undefined | Location[]>(
    undefined
  );

  const [pubsubEvent, setPubSubEvent] = useState({});

  const eventQuery = trpc.queries.events.useQuery();
  // console.log( eventQuery.data![0].event_cord);

  trpc.subscriptions.onAdd.useSubscription(undefined, {
    onData: (data) => {
      // console.log("pub sub:",data);
      setPubSubEvent(data);
    },
  });
  console.log(pubsubEvent);
  useEffect(() => {
    const newIconLocations = eventQuery.data?.map((event) => {
      console.log(event.event_cord);
      return {
        id: event.event_id,
        coordinates: event.event_cord,
      };
    });

    setIconLocations(newIconLocations);
  }, [{}]);

  return (
    <>
      <RMap
        className="example-map"
        width="100%"
        height="600px"
        initial={{ center: fromLonLat([34, 32]), zoom: 7 }}
      >
        <ROSM />
        <RLayerVector>
          {iconLocations?.map(({ id, coordinates }) => (
            <RFeature key={id} geometry={new Point(fromLonLat(coordinates))}>
              <RStyle.RStyle>
                <RStyle.RIcon src={icon} anchor={[0.5, 0.8]} />
              </RStyle.RStyle>
              <ROverlay className="example-overlay">
                <span className="material-icons">local_activity</span>
              </ROverlay>
            </RFeature>
          ))}
        </RLayerVector>
      </RMap>
      <div className="flex">
          <div className="w-1/2 pr-8">
            {/* Map View */}
            {/* ... (unchanged) */}
            <Link to="/map-view" className="text-blue-500 hover:underline">
            Map View
          </Link>
          </div>
          <div className="w-1/2">
            {/* List View */}
            {/* ... (unchanged) */}
            <Link to="/list-view" className="text-blue-500 hover:underline">
            List View
          </Link>
          </div>
        </div>
    </>
  );
};

export default MapWithIcons;
