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
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  addCommentThunk,
  getSinglePostThunk,
} from "../src/Redux/Auth/operations";
import { getCurrentUser, getSinglePost } from "../src/Redux/Auth/selectors";

export const CommentsScreen = ({ route }) => {
  const postId = route.params.postId;
  const [commentText, setComment] = useState("");
  const singlePost = useSelector(getSinglePost);
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSinglePostThunk(postId));
  }, []);

  const handleAddComment = (postId) => {
    dispatch(
      addCommentThunk({
        commentText,
        displayName: currentUser.displayName,
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
          <Image
            style={styles.postImage}
            source={{ uri: singlePost.photoUrl }}
          />
          {singlePost.comments && singlePost.comments.length > 0 ? (
            singlePost.comments.map((comment, index) => (
              <View key={index} style={styles.commentContainer}>
                <Text style={styles.commentNameContainer}>
                  {comment.displayName}
                </Text>
                <View style={styles.commentTextContainer}>
                  <Text>{comment.commentText}</Text>
                  <Text style={styles.commentData}>{comment.createdAt}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text>No comments yet</Text>
          )}
          <View style={styles.commentFormContainer}>
            <TextInput
              value={commentText}
              onChangeText={(text) => setComment(text)}
              placeholder="Коментувати..."
              style={styles.commentFormInput}
            />
            <TouchableOpacity
              onPress={() => handleAddComment(postId)}
              disabled={commentText ? false : true}
            >
              <Ionicons
                name="arrow-up-circle-outline"
                size={34}
                style={styles.commentIcon}
              />
            </TouchableOpacity>
          </View>
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
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 24,
    width: 343,
  },
  commentNameContainer: {
    marginRight: 16,
  },
  commentTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    borderRadius: 6,
    flex: 1,
  },
  commentData: {
    color: "#BDBDBD",
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    marginTop: 8,
  },
  commentFormContainer: {
    flexDirection: "row",
    width: 343,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 50,
  },
  commentFormInput: { padding: 16 },
  commentIcon: {
    color: "#FF6C00",
    marginRight: 8,
  },
});
