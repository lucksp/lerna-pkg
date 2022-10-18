# ClusterMap

- This is a map with clusters for each vehicle.

```ts
import { ClusterMapProvider, MapView } from `@lucksp/mobile-maps`


  const formattedPins = data?.map((datum) => ({
    coordinates: { lat: datum.lat, lng: datum.long },
    fleetNumber: datum.fleetId,
    id: datum.id,
    vehicleType: datum.vehicleType as VEHICLE_TYPES,
    isElectric: datum.isEV,
  }));


<ClusterMapProvider centerCoords={{...latLng}}>
    <YourComponent>
        <MapView
            loading={loadingStateFromAPI}
            markers={formattedPins}
            onPressMarker={(i) => console.log("pressed ", i)}
        />
    </YourComponent>
</ClusterMapProvider>
```

### The ClusterMapProvider

You may likely need a way to load the map with a known center point in order to
fetch data with a bounding box. In this case, in your Component, it is
recommended to use the `SWR` callback option `onSuccess` like so:

```ts
const { boundingBox, handleSetMarkersToFit } = useClusterMapContext();
const { southWest, northEast } = boundingBox || {};

const { data, mutate, isValidating } = useSWR<Vehicle[]>(
  [southWest && northEast ? url : null, authState.userToken],
  () => {
    return flatArrayFetcher({ path: url, authState, pushError });
  },
  {
    onSuccess: () => handleSetMarkersToFit(),
  },
);
```
