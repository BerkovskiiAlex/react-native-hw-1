/** @format */

import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromFirestoreThunk,
  addCommentThunk,
} from "../src/Redux/Auth/operations";
import {
  getPosts,
  getPostsUpdate,
  getCurrentUser,
} from "../src/Redux/Auth/selectors";

export const PostsScreen = () => {
  const [commentText, setComment] = useState("");
  const posts = useSelector(getPosts);
  const isPostsUpdate = useSelector(getPostsUpdate);
  console.log(posts);
  const currentUser = useSelector(getCurrentUser);
  console.log(currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataFromFirestoreThunk());
  }, [dispatch, isPostsUpdate]);

  const handleAddComment = (postId) => {
    dispatch(
      addCommentThunk({
        commentText,
        uid: currentUser.uid,
        createdAt: new Date().toString(),
        postId,
      })
    );
    setComment("");
  };

  return (
    <View style={styles.postsScreenContainer}>
      {posts.map((postObj, index) => (
        <View key={postObj.postId}>
          <Text>{postObj.post.title}</Text>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: postObj.post.photoUrl }}
          />
          <TextInput
            value={commentText}
            onChangeText={(text) => setComment(text)}
            placeholder="Add a comment..."
          />
          <Button
            title="Add Comment"
            onPress={() => handleAddComment(postObj.postId)}
          />
        </View>
      ))}
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
