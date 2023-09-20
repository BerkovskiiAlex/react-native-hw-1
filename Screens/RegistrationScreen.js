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
} from "react-native";
import addPhoto from "../assets/images/addPhoto.jpg";

export const RegistrationScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const handleSubmit = () => {};

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
    <View style={styles.registrationScreenContainer}>
      <Image source={addPhoto} style={styles.image} />
      <Text style={styles.registrationScreenText}>Реєстрація</Text>
      <View style={styles.inputsContainer}>
        <View style={styles.textInputWrapper}>
          <TextInput style={styles.textInput} placeholder="Логін" />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Адреса електронної пошти"
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
          />
        </View>
      </View>
      {!keyboardVisible && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Зареєструватися</Text>
        </TouchableOpacity>
      )}
      {!keyboardVisible && (
        <Text style={styles.loginText}>Вже є акаунт? Увійти</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
