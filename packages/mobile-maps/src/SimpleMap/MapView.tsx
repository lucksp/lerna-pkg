import { useTheme } from '@rneui/themed';
import React from 'react';
import MapViewRaw from 'react-native-maps';

import { Props } from '../common/types';
import { Markers } from '../Markers';
import { useMapStyles } from './styles';
import { useSimpleMapContext } from './useSimpleMap';

export const MapView = (props: Props) => {
  const { mapRef, region, setIsMapReady, handleSetMarkersToFit, centerCoords } =
    useSimpleMapContext();
  const {
    showUserLocation = true,
    markerHeight,
    markerWidth,
    markers,
    onPressMarker,
    ...rest
  } = props;
  const {
    theme: { colors },
  } = useTheme();

  const mapStyles = useMapStyles();

  const onMapReady = () => {
    setIsMapReady(true);
    handleSetMarkersToFit();
  };

  if (!region || !centerCoords) return <Spinner />;

  return (
    <MapViewRaw
      initialRegion={region}
      loadingEnabled
      onMapReady={onMapReady}
      ref={mapRef}
      showsPointsOfInterest={false}
      showsScale={false}
      showsUserLocation={showUserLocation}
      style={mapStyles.map}
      {...rest}
    >
      <Markers
        height={markerHeight}
        markers={markers}
        onPressMarker={onPressMarker}
        width={markerWidth}
      />
    </MapViewRaw>
  );
};
