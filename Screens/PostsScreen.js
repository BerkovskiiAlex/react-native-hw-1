/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const PostsScreen = () => {
  return (
    <View style={styles.postsScreenContainer}>
      <Text>Posts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postsScreenContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    borderColor: "rgba(0, 0, 0, 0.30)",
    borderTopWidth: 0.5,
  },
});
