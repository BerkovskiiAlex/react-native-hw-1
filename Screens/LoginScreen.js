/** @format */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";

export const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = () => {
    console.log("Вход:", email, password);
  };

  return (
    <View style={styles.loginScreenContainer}>
      <Text style={styles.loginScreenText}>Увійти</Text>
      <View style={styles.inputsContainer}>
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Увійти</Text>
        </TouchableOpacity>
      )}
      {!keyboardVisible && (
        <Text style={styles.loginText}>Немає акаунту? Зареєструватися</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loginScreenContainer: {
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
  loginScreenText: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 30,
    letterSpacing: 0.3,
    marginTop: 32,
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
    marginTop: 14,
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
    marginBottom: 112,
  },
});
