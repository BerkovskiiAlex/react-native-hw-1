/** @format */

import React, { useEffect } from "react";
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
      {posts &&
        posts.map((postObj) => {
          const { post } = postObj;
          if (!post) return null;
          return (
            <View key={postObj.postId} style={styles.postContainer}>
              <Image style={styles.postImage} source={{ uri: post.photoUrl }} />
              <Text style={styles.postTitle}>{post.title}</Text>
              <View style={styles.descriptionContainer}>
                <TouchableOpacity
                  style={styles.descriptionTouchableOpacity}
                  onPress={() => {
                    handleGoToPost(postObj.postId);
                  }}
                >
                  <Ionicons name="chatbubbles-outline" size={20} />
                  <Text style={styles.descriptionQuantity}>
                    {postObj.post.comments ? postObj.post.comments.length : 0}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.descriptionTouchableOpacity}
                  onPress={() => {
                    navigation.navigate("Карта", {
                      location: post.location,
                      markerTitle: post.markerTitle,
                    });
                  }}
                >
                  <Ionicons name="location-outline" size={20} />
                  <Text style={styles.descriptionText}>{post.markerTitle}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
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
    gap: 32,
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  postContainer: {
    gap: 8,
  },
  postTitle: { color: "#212121", fontFamily: "Roboto-Medium", fontSize: 16 },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionTouchableOpacity: {
    flexDirection: "row",
  },
  descriptionQuantity: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginLeft: 8,
  },
  descriptionLink: {
    color: "#212121",
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
