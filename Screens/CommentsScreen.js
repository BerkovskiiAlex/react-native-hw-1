/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const CommentsScreen = () => {
  return (
    <View style={styles.commentsScreenContainer}>
      <Text>Comments</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentsScreenContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
  },
});
