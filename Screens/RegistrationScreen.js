/** @format */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import addPhoto from "../assets/images/addPhoto.jpg";
import PhotoBG from "../assets/images/PhotoBG.jpg";

export const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Вход:", login, email, password);
    navigation.navigate("Home");
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const keyboardDidShow = () => setKeyboardVisible(true);
  const keyboardDidHide = () => setKeyboardVisible(false);

  useEffect(() => {
    const keyboardDidShowSubscription = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardDidHideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    return () => {
      keyboardDidShowSubscription.remove();
      keyboardDidHideSubscription.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={PhotoBG} style={styles.imageBackground}>
          <View style={styles.registrationScreenContainer}>
            <Image source={addPhoto} style={styles.image} />
            <Text style={styles.registrationScreenText}>Реєстрація</Text>
            <View style={styles.inputsContainer}>
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Логін"
                  value={login}
                  onChangeText={setLogin}
                />
              </View>
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Адреса електронної пошти"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View style={styles.passwordContainer}>
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.showPasswordButton}
                >
                  <Text style={styles.showPasswordText}>
                    {passwordVisible ? "Приховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.textInput}
                  placeholder="Пароль"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>
            {!keyboardVisible && (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Зареєструватися</Text>
              </TouchableOpacity>
            )}
            {!keyboardVisible && (
              <TouchableOpacity>
                <Text
                  style={styles.loginText}
                  onPress={() => navigation.navigate("Login")}
                >
                  Вже є акаунт? Увійти
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  registrationScreenContainer: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  image: {
    position: "absolute",
    top: -60,
    width: 132,
    height: 120,
    borderRadius: 15,
  },
  registrationScreenText: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 30,
    letterSpacing: 0.3,
    marginTop: 92,
    lineHeight: 35,
  },
  inputsContainer: {
    marginTop: 32,
  },
  marginBottom16: {
    marginBottom: 16,
  },
  textInput: {
    width: 343,
    height: 50,
    padding: 16,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
  },
  textInputWrapper: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    marginBottom: 16,
  },
  passwordContainer: {
    width: 343,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    marginBottom: 32,
  },
  showPasswordButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  showPasswordText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  submitButton: {
    marginTop: 10,
    width: 343,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  loginText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 46,
  },
});
