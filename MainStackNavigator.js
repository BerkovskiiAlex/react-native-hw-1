/** @format */

import { createStackNavigator } from "@react-navigation/stack";
import { getLoggedIn } from "./src/Redux/Auth/selectors";

import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { Home } from "./Screens/Home";
import { useSelector } from "react-redux";
import { CreatePostsScreen } from "./Screens/CreatePostsScreen";

const MainStack = createStackNavigator();

export const MainStackNavigator = () => {
  const isLoggedIn = useSelector(getLoggedIn);

  return (
    <MainStack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
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
      <MainStack.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{ headerShown: true }}
      />
    </MainStack.Navigator>
  );
};
