/** @format */

import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentThunk,
  getSinglePostThunk,
} from "../src/Redux/Auth/operations";
import {
  getCurrentUser,
  getPostsUpdate,
  getSinglePost,
} from "../src/Redux/Auth/selectors";

export const SinglePostScreen = ({ route }) => {
  const postId = route.params.postId;
  const [commentText, setComment] = useState("");
  const singlePost = useSelector(getSinglePost);
  const isPostsUpdate = useSelector(getPostsUpdate);
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSinglePostThunk(postId));
  }, []);

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
    setTimeout(() => {
      dispatch(getSinglePostThunk(postId));
    }, 500);
  };

  return (
    <ScrollView contentContainerStyle={styles.postsScreenContainer}>
      {singlePost && (
        <View key={singlePost.postId}>
          <Text>{singlePost.title}</Text>
          <Image
            style={{ width: 343, height: 240 }}
            source={{ uri: singlePost.photoUrl }}
          />
          {singlePost.comments && singlePost.comments.length > 0 ? (
            singlePost.comments.map((comment, index) => (
              <View key={index}>
                <Text>{comment.commentText}</Text>
                <Text>{comment.createdAt}</Text>
              </View>
            ))
          ) : (
            <Text>No comments yet</Text>
          )}
          <TextInput
            value={commentText}
            onChangeText={(text) => setComment(text)}
            placeholder="Add a comment..."
          />
          <Button
            title="Add Comment"
            onPress={() => handleAddComment(postId)}
          />
        </View>
      )}
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
});
