/** @format */

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export const MapScreen = ({ route, navigation }) => {
  const { location, markerTitle } = route.params;
  const [isMapReady, setMapReady] = useState(false);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.mapStyle}
      region={{
        ...location,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      mapType="standard"
      minZoomLevel={15}
      onMapReady={() => {
        console.log("Map is ready");
        setMapReady(true);
      }}
      onRegionChange={() => console.log("Region change")}
    >
      {location && isMapReady && (
        <Marker title={markerTitle} coordinate={location} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
