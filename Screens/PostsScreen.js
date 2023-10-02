/** @format */

import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getDataFromFirestoreThunk } from "../src/Redux/Auth/operations";
import { getPosts, getPostsUpdate } from "../src/Redux/Auth/selectors";
import { useNavigation } from "@react-navigation/native";

export const PostsScreen = () => {
  const posts = useSelector(getPosts);
  const isPostsUpdate = useSelector(getPostsUpdate);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getDataFromFirestoreThunk());
  }, [dispatch, isPostsUpdate]);

  const handleGoToPost = (postId) => {
    navigation.navigate("Коментарі", { postId });
  };

  return (
    <ScrollView contentContainerStyle={styles.postsScreenContainer}>
      {posts.map((postObj, index) => (
        <View key={postObj.postId}>
          <Text>{postObj.post.title}</Text>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: postObj.post.photoUrl }}
          />
          <View style={styles.commentsContainer}>
            <TouchableOpacity
              onPress={() => {
                handleGoToPost(postObj.postId);
              }}
            >
              <Ionicons name="chatbubbles-outline" size={20} />
            </TouchableOpacity>
            <Text>
              {postObj.post.comments ? postObj.post.comments.length : 0}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postsScreenContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 70,
  },
  commentsContainer: {
    flexDirection: "row",
  },
});
