import { useTheme } from '@rneui/themed';
import React, { useMemo } from 'react';
import MapView from 'react-native-map-clustering';

import { generateClusterMarkers } from '../ClusterMarkers';
import { Props } from '../common/types';
import { useMapStyles } from './styles';
import { useClusterMapContext } from './useClusterMap';

export const ClusterMapView = (props: Props): JSX.Element => {
  const { mapRef, region, setIsMapReady, centerCoords, setBoundingBox } =
    useClusterMapContext();

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

  const onMapReady = async () => {
    setIsMapReady(true);

    const boundingBox = await mapRef?.current?.getMapBoundaries();
    setBoundingBox(boundingBox);
  };

  const clusters = useMemo(
    () =>
      generateClusterMarkers({
        colors: colors,
        height: markerHeight,
        markers,
        onPressMarker,
        width: markerWidth,
      }),
    [colors, markerHeight, markerWidth, markers, onPressMarker],
  );

  if (!region || !centerCoords) return <Spinner />;

  return (
    <MapView
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
      {markers && clusters}
    </MapView>
  );
};
