import { LatLng, MapViewProps } from 'react-native-maps';

import { VEHICLE_TYPES } from '../types';

export type MarkerShape = {
  coordinates: LatLngShort;
  fleetNumber: string;
  id: number;
  instabook?: boolean;
  isAvailable?: boolean;
  isElectric?: boolean;
  vehicleType?: VEHICLE_TYPES;
};

export interface LatLngShort {
  lat: number;
  lng: number;
}

export interface Props extends MapViewProps {
  centerCoords?: LatLng;
  markerHeight?: number;
  markerWidth?: number;
  markers?: MarkerShape[];
  onPressMarker?: (markerId: number) => void;
  showUserLocation?: boolean;
}
export interface Region extends LatLng {
  latitudeDelta: number;
  longitudeDelta: number;
}
