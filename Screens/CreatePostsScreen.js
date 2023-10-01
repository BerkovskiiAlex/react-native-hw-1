/** @format */

import React, { useState, useRef, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import { Camera } from "expo-camera";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { storage } from "../src/Redux/Firebase/config";
import { addPostThunk } from "../src/Redux/Auth/operations";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoTitle, setPhotoTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isMapReady, setMapReady] = useState(false);
  const navigation = useNavigation();
  const [photoUri, setPhotoUri] = useState(null);
  const dispatch = useDispatch();
  const isFormValid = photoTitle && location && photoUri;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function checkPermissionsOnFocus() {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        const audioStatus = await Camera.requestMicrophonePermissionsAsync();
        const libStatus = await MediaLibrary.requestPermissionsAsync();

        if (isActive) {
          setHasPermission(
            cameraStatus.status === "granted" &&
              audioStatus.status === "granted" &&
              libStatus.status === "granted"
          );
        }
      }

      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      })();

      checkPermissionsOnFocus();

      return () => {
        isActive = false;
      };
    }, [])
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Немає доступу до камери</Text>;
  }

  const handleCreatePost = async () => {
    console.log(storage);

    const storageRef = ref(storage, "photos/" + photoUri.split("/").pop());

    try {
      let response = await fetch(photoUri);
      let blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const photoUrl = await getDownloadURL(storageRef);

      dispatch(addPostThunk({ photoTitle, photoUrl, location, comments: [] }));
      navigation.navigate("Публікації");
    } catch (error) {
      console.error("Ошибка загрузки фотографии:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.photoView}>
            <TouchableOpacity
              style={styles.flipContainer}
              onPress={() => {
                console.log("камера змінена");
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons
                name="camera-reverse-outline"
                size={20}
                style={styles.cameraReverseIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                if (cameraRef.current) {
                  const { uri } = await cameraRef.current.takePictureAsync();
                  await MediaLibrary.createAssetAsync(uri);
                  setPhotoUri(uri);
                }
              }}
            >
              <View style={styles.takePhotoOut}>
                <View style={styles.takePhotoInner}></View>
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setPhotoTitle}
          value={photoTitle}
          placeholder="Назва"
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => {
          console.log("Map is ready");
          setMapReady(true);
        }}
        onRegionChange={() => console.log("Region change")}
        onPress={(e) => {
          setLocation(e.nativeEvent.coordinate);
        }}
      >
        {location && isMapReady && (
          <Marker title="I am here" coordinate={location} description="Hello" />
        )}
      </MapView>
      <TouchableOpacity
        onPress={handleCreatePost}
        style={[
          styles.publishButton,
          !isFormValid && { backgroundColor: "lightgray" },
        ]}
        disabled={!isFormValid}
      >
        <Text style={styles.publishButtonText}>Опублікувати</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  cameraContainer: {
    width: "100%",
    height: Dimensions.get("window").width,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  flipContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  cameraReverseIcon: {
    color: "#FFF",
    fontSize: 36,
    width: 60,
    height: 60,
    lineHeight: 58,
    paddingTop: 2,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    borderRadius: 30,
    textAlign: "center",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "white",
    color: "white",
    paddingLeft: 5,
  },
  publishButton: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
  },
  publishButtonText: {
    color: "white",
    fontSize: 18,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
    marginTop: 12,
  },
});
