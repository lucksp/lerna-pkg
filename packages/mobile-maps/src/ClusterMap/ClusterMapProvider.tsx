import * as Location from 'expo-location';
import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import MapView, { BoundingBox, LatLng, Region } from 'react-native-maps';

import { radiusToDelta } from '../common';
import { Props } from '../common/types';

export interface ClusterMapProviderShape {
  boundingBox?: BoundingBox;
  centerCoords?: LatLng;
  handleSetMarkersToFit: (itemCoords?: LatLng[]) => void;
  initialSearchRadius: number;
  isMapReady: boolean;
  mapRef: MutableRefObject<MapView | null>;
  region?: Region;
  setBoundingBox: React.Dispatch<React.SetStateAction<BoundingBox | undefined>>;
  setIsMapReady: React.Dispatch<React.SetStateAction<boolean>>;
  setRegion: (region: Region) => void;
}

export const ClusterMapContext = createContext<
  ClusterMapProviderShape | undefined
>(undefined);

type ProviderProps = {
  centerCoords?: Props['centerCoords'];
  children: ReactNode;
  initialSearchRadius?: number;
};

const ClusterMapProvider = ({
  centerCoords,
  children,
  initialSearchRadius = 10,
}: ProviderProps) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const [userLatLng, setUserLatLng] = useState(centerCoords);
  const [boundingBox, setBoundingBox] = useState<BoundingBox>();
  const [region, setRegion] = useState<Region>();

  const mapRef = useRef<MapView>(null);

  const deltas = useMemo(() => {
    if (!userLatLng?.latitude)
      return {
        latitudeDelta: undefined,
        longitudeDelta: undefined,
      };
    return radiusToDelta(initialSearchRadius, userLatLng?.latitude);
  }, [initialSearchRadius, userLatLng?.latitude]);

  const userLatLngMemo = useMemo(() => userLatLng, [userLatLng]);

  useEffect(
    function generateRegion() {
      if (
        userLatLngMemo?.latitude &&
        userLatLngMemo.longitude &&
        deltas?.latitudeDelta &&
        deltas?.longitudeDelta
      ) {
        setRegion({ ...deltas, ...userLatLngMemo });
      }
    },
    [deltas, userLatLngMemo],
  );

  useEffect(
    function getCoords() {
      async function getCoords() {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });
        setUserLatLng({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
      if (!userLatLng?.latitude || !userLatLng?.longitude) {
        getCoords();
      }
    },
    [
      deltas.latitudeDelta,
      deltas.longitudeDelta,
      userLatLng?.latitude,
      userLatLng?.longitude,
    ],
  );

  const handleSetMarkersToFit = (itemCoords?: LatLng[]) => {
    if (itemCoords?.length) {
      mapRef?.current?.fitToCoordinates(itemCoords, {
        animated: false,
        edgePadding: { left: 32, top: 32, right: 32, bottom: 32 },
      });
    } else {
      mapRef?.current?.fitToElements({
        animated: false,
        edgePadding: { left: 8, top: 8, right: 8, bottom: 8 },
      });
    }
  };

  return (
    <ClusterMapContext.Provider
      value={{
        centerCoords: userLatLng,
        mapRef,
        isMapReady,
        setIsMapReady,
        handleSetMarkersToFit,
        initialSearchRadius,
        region,
        setRegion,
        boundingBox,
        setBoundingBox,
      }}
    >
      {children}
    </ClusterMapContext.Provider>
  );
};

export { ClusterMapProvider };
