import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';

import { getIcon } from '../common';
import { Props } from '../common/types';

interface MarkerProps {
  height?: number;
  markers: Props['markers'];
  onPressMarker?: Props['onPressMarker'];
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
      {markers?.map(({ coordinates, ...rest }) => {
        const { lat, lng } = coordinates;
        const { id, vehicleType, isAvailable, isElectric } = rest;

        const MarkerIcon = getIcon(vehicleType);
        let markerColor = 'blue';
        if (isElectric && isAvailable) {
          markerColor = 'green';
        } else if (isAvailable === false) {
          markerColor = 'gray';
        }

        return (
          <Marker
            anchor={{ x: 0, y: 0 }}
            coordinate={{ latitude: lat, longitude: lng }}
            identifier={id?.toString()}
            key={id}
            onPress={() => onPressMarker?.(id)}
            tracksViewChanges={false}
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
