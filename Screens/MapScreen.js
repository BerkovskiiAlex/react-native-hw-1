/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const MapScreen = () => {
  return (
    <View style={styles.mapScreenContainer}>
      <Text>Map</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mapScreenContainer: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
  },
});
