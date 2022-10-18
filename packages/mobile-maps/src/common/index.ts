import { LatLng } from 'react-native-maps';

import { MapPinIcon } from '../Icons/MapPinIcon';
import { MapPinIconBoxTruck } from '../Icons/MapPinIconBoxTruck';
import { MapPinIconCar } from '../Icons/MapPinIconCar';
import { MapPinIconPickup } from '../Icons/MapPinIconPickup';
import { MapPinIconTrailer } from '../Icons/MapPinIconTrailer';
import { MapPinIconVan } from '../Icons/MapPinIconVan';
import { VEHICLE_TYPES } from '../types';
import { Props } from './types';

export const getIcon = (vehicleType?: VEHICLE_TYPES) => {
  switch (VEHICLE_TYPES[vehicleType || '']) {
    case VEHICLE_TYPES['box-truck']:
      return MapPinIconBoxTruck;

    case VEHICLE_TYPES['car-suv']:
      return MapPinIconCar;

    case VEHICLE_TYPES['cargo-van']:
      return MapPinIconVan;

    case VEHICLE_TYPES['misc-trailer']:
      return MapPinIconTrailer;

    case VEHICLE_TYPES['pickup-truck']:
      return MapPinIconPickup;

    default:
      return MapPinIcon;
  }
};

export const makeStringArr = (markers: Props['markers']): LatLng[] =>
  [...(markers || [])].map((item) => ({
    latitude: item.coordinates.lat,
    longitude: item.coordinates.lng,
  }));

export const radiusToDelta = (radius: number, lat: number) => {
  // as described here: https://github.com/react-native-maps/react-native-maps/issues/505#issuecomment-354029449
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const diameter = radius * 2;
  const delta =
    (diameter * 1609.34) /
    (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

  return {
    latitudeDelta: delta,
    longitudeDelta: delta,
  };
};
