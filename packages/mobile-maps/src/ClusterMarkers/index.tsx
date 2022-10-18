import { Colors } from '@rneui/themed';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';

import { getIcon } from '../common';
import { Props } from '../common/types';

interface MarkerProps {
  colors: Colors;
  height?: number;
  markers: Props['markers'];
  onPressMarker?: Props['onPressMarker'];
  width?: number;
}

export const generateClusterMarkers = ({
  markers,
  onPressMarker,
  height = 48,
  width = 34,
  colors,
}: MarkerProps): ReactElement[] => {
  return [...(markers || [])].map((marker) => {
    const { id, vehicleType, isAvailable, isElectric, coordinates } = marker;
    const { lat, lng } = coordinates;

    const MarkerIcon = getIcon(vehicleType);
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
        key={id}
        onPress={() => onPressMarker?.(marker.id)}
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
  });
};
