/** @format */

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export const RegistrationScreen = () => {
  const handleSubmit = () => {};

  return (
    <View style={styles.registrationScreenContainer}>
      <Text style={styles.registrationScreenText}>Реєстрація</Text>
      <TextInput style={styles.textInput} placeholder="Логін" />
      <TextInput
        style={styles.textInput}
        placeholder="Адреса електронної пошти"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Пароль"
        secureTextEntry
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Зареєструватися</Text>
      </TouchableOpacity>
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
    height: 549,
    position: "absolute",
    bottom: 0,
  },
  registrationScreenText: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 30,
    letterSpacing: 0.3,
    marginTop: 92,
    lineHeight: 35,
  },
  textInput: {
    width: 343,
    height: 50,
    padding: 16,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  submitButton: {
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
});
