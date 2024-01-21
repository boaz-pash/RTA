import { Point } from 'ol/geom';
import { fromLonLat, toLonLat } from 'ol/proj';
import { useCallback, useState } from 'react';
import {
  MapBrowserEvent,
  RControl,
  RFeature,
  RLayerVector,
  RMap,
  ROSM,
  ROverlay,
  RStyle,
} from 'rlayers';
import { RView } from 'rlayers/RMap';
import icon from '../../utils/svg/monument';

const origin = [32.189, 35.104];
const initial: RView = { center: fromLonLat(origin), zoom: 11 };
const Map2 = () => {
  const [loc, setLoc] = useState(origin);
  const [view, setView] = useState(initial);
  return (
    <>
      <RMap
        className="example-map"
        width="100%"
        height="600px"
        initial={initial}
        view={[view, setView]}
        noDefaultControls={true}
        onClick={useCallback((e: MapBrowserEvent<UIEvent>) => {
          const coords = e.map.getCoordinateFromPixel(e.pixel);
          const lonlat = toLonLat(coords);
          console.log(lonlat);
          setLoc(lonlat);
        }, [])}
      >
        <ROSM />
        <RLayerVector>
          <RFeature
            geometry={new Point(fromLonLat(loc))}
            // useCallback is here for performance reasons
            // without it RFeature will have its props updated at every call
            onPointerDrag={useCallback((e: MapBrowserEvent<UIEvent>) => {
              const coords = e.map.getCoordinateFromPixel(e.pixel);
              e.target.setGeometry(new Point(coords));
              // this stops OpenLayers from interpreting the event to pan the map
              // e.disablePropagation();
              return false;
            }, [])}
            onPointerDragEnd={useCallback((e: MapBrowserEvent<UIEvent>) => {
              const coords = e.map.getCoordinateFromPixel(e.pixel);
              setLoc(toLonLat(coords));
            }, [])}
            onPointerEnter={useCallback(
              (e: MapBrowserEvent<UIEvent>) =>
                (e.map.getTargetElement().style.cursor = 'move') && undefined,
              []
            )}
            onPointerLeave={useCallback(
              (e: MapBrowserEvent<UIEvent>) =>
                (e.map.getTargetElement().style.cursor = 'initial') &&
                undefined,
              []
            )}
          >
            <RStyle.RStyle>
              <RStyle.RIcon src={icon} anchor={[0.5, 0.8]} />
            </RStyle.RStyle>
            <ROverlay className="example-overlay">Move me</ROverlay>
          </RFeature>
        </RLayerVector>
        <RControl.RCustom className="example-control">
          <button onClick={() => setView({ ...view, center: fromLonLat(loc) })}>
            o
          </button>
        </RControl.RCustom>
      </RMap>
      <div className="mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow">
        <p>
          Last click location is{' '}
          <strong>{`${loc[1].toFixed(3)} : ${loc[0].toFixed(3)}`}</strong>
        </p>
      </div>
    </>
  );
};
export default Map2;
