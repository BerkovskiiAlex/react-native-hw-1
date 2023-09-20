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
