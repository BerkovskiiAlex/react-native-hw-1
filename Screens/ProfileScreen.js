/** @format */

import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getPosts } from "../src/Redux/Auth/selectors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../src/Redux/Auth/selectors";
import PhotoBG from "../assets/images/PhotoBG.jpg";
import { logout } from "../src/Redux/Auth/AuthSlice";

export const ProfileScreen = () => {
  const posts = useSelector(getPosts);
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleGoToPost = (postId) => {
    navigation.navigate("Коментарі", { postId });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={PhotoBG} style={styles.imageBackground}>
        <View style={styles.profileScreenContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.textHidden}>hidden</Text>
            <Text style={styles.nameText}>{currentUser.displayName}</Text>
            <Ionicons
              name="log-out-outline"
              size={24}
              style={styles.IconLogout}
              onPress={handleLogout}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {posts &&
              posts.map((postObj) => {
                const { post } = postObj;
                if (!post) return null;
                return (
                  <View key={postObj.postId} style={styles.postContainer}>
                    <Image
                      style={styles.postImage}
                      source={{ uri: post.photoUrl }}
                    />
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
                          {postObj.post.comments
                            ? postObj.post.comments.length
                            : 0}
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
                        <Text style={styles.descriptionText}>
                          {post.markerTitle}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 150,
  },
  profileScreenContainer: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1,
    paddingBottom: 20,
    position: "relative",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    width: 343,
    alignItems: "center",
    marginBottom: 32,
  },
  nameText: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    letterSpacing: 0.3,
  },
  IconLogout: {
    color: "#BDBDBD",
  },
  textHidden: {
    opacity: 0,
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  postContainer: {
    gap: 8,
    marginBottom: 32,
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
