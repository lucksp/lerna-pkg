import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';

import { Props } from '../types';
import { icon } from './common';

interface MarkerProps {
  height?: number;
  markers: Props['markers'];
  onPressMarker: (markerId: number) => void;
  width?: number;
}

export const Markers = ({
  markers,
  onPressMarker,
  height = 48,
  width = 34,
}: MarkerProps) => {

  return (
    <>
      {markers?.map((marker) => {
        const { id, vehicleType, isAvailable, isElectric, coordinates } =
          marker;
        const { lat, lng } = coordinates;

        const MarkerIcon = icon[vehicleType || 'default'];
        let markerColor = 'blue';
        if (isElectric && isAvailable) {
          markerColor = 'green';
        } else if (!isAvailable) {
          markerColor = 'gray';
        }

        return (
          <Marker
            anchor={{ x: 0, y: 0 }}
            coordinate={{ latitude: lat, longitude: lng }}
            identifier={id?.toString()}
            key={`${id}`}
            onPress={() => onPressMarker?.(marker.id)}
          >
            <View
              style={{
                width: width,
                height: height,
              }}
            >
              <MarkerIcon
                color={markerColor}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                width={width}
              />
            </View>
          </Marker>
        );
      })}
    </>
  );
};
