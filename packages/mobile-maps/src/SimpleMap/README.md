# SimpleMap

- This is a basic map with individual pins for each vehicle.

```ts
import { SimpleMapProvider, MapView } from `@lucksp/mobile-maps`


  const formattedPins = data?.map((datum) => ({
    coordinates: { lat: datum.lat, lng: datum.long },
    fleetNumber: datum.fleetId,
    id: datum.id,
    vehicleType: datum.vehicleType as VEHICLE_TYPES,
    isElectric: datum.isEV,
  }));


<SimpleMapProvider centerCoords={{...latLng}}>
    <YourComponent>
        <MapView
            loading={loadingStateFromAPI}
            markers={formattedPins}
            onPressMarker={(i) => console.log("pressed ", i)}
        />
    </YourComponent>
</SimpleMapProvider>
```
