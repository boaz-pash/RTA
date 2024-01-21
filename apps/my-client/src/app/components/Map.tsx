import { useCallback, useRef, useState } from 'react';
import { fromLonLat, toLonLat } from 'ol/proj';
import { boundingExtent } from 'ol/extent';
import { DragBoxEvent } from 'ol/interaction/DragBox';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { shiftKeyOnly } from 'ol/events/condition';
// import "ol/ol.css";

import monument from '../../utils/svg/monument.svg';
import {
  RMap,
  ROSM,
  RInteraction,
  RLayerVector,
  RStyle,
  RFeature,
} from 'rlayers';
import { TranslateEvent } from 'ol/interaction/Translate';

export const coords: Record<string, Coordinate> = {
  'Arc de Triomphe': [2.295, 48.8737],
  "Place d'Italie": [2.355, 48.831],
  Bastille: [2.369, 48.853],
  'Tour Eiffel': [2.294, 48.858],
  Montmartre: [2.342, 48.887],
};

const coordsToString = (coords: Coordinate): string =>
  `${coords[1].toFixed(3)}:${coords[0].toFixed(3)}`;

export default function Interactions(): JSX.Element {
  const [startDragBox, setStartDragBox] = useState<Coordinate | undefined>(
    undefined
  );
  const [endDragBox, setEndDragBox] = useState<Coordinate | undefined>(
    undefined
  );
  const [msg, setMsg] = useState<string>(
    '<p>Hold shift to select an area or drag and drop the monuments</p>'
  );
  // The features must be part of the state as they will be modified
  const [features] = useState<Feature[]>(() =>
    Object.keys(coords).map(
      (f) =>
        new Feature({
          geometry: new Point(fromLonLat(coords[f])),
          name: f,
        })
    )
  );
  const vectorRef = useRef<RLayerVector>(null);

  return (
    <>
      <RMap
        className="example-map"
        height="500px"
        width="100%"
        initial={{ center: fromLonLat([2.364, 48.82]), zoom: 11 }}
      >
        <ROSM />

        <RLayerVector ref={vectorRef}>
          <RStyle.RStyle>
            <RStyle.RIcon src={monument} />
            
          </RStyle.RStyle>
          {features.map((f, i) => (
            <RFeature key={i} feature={f} />
          ))}
        </RLayerVector>

        <RInteraction.RDragBox
          condition={shiftKeyOnly}
          onBoxStart={useCallback((e: DragBoxEvent) => {
            setStartDragBox(e.coordinate);
            setEndDragBox(undefined);
          }, [])}
          onBoxEnd={useCallback(
            (e: DragBoxEvent) => {
              setEndDragBox(e.coordinate);
              const selected: string[] = [];
              if (vectorRef.current && startDragBox)
                vectorRef.current.source.forEachFeatureInExtent(
                  boundingExtent([startDragBox, e.coordinate]),
                  (f) => selected.push(f.get('name')) && false
                );
              setMsg(
                `You selected <strong>${
                  selected.join(', ') || 'no monuments'
                }</strong>`
              );
            },
            [startDragBox, vectorRef]
          )}
        />

        <RInteraction.RTranslate
          onTranslateEnd={useCallback((e: TranslateEvent) => {
            const f = e.features.item(0);
            const coords = toLonLat(
              (f.getGeometry() as Point).getFirstCoordinate()
            );
            setMsg(
              `You placed <strong>${f.get('name')}</strong> at ${coordsToString(
                coords
              )}`
            );
          }, [])}
        />
      </RMap>
      <div
        className="mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow"
        dangerouslySetInnerHTML={{ __html: msg }}
      />
    </>
  );
}
