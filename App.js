/** @format */

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { Home } from "./Screens/Home";
import store from "./src/Redux/Store";
import { Text } from "react-native";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <NavigationContainer>
          <StatusBar style="auto" />
          <MainStack.Navigator initialRouteName="Registration">
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
