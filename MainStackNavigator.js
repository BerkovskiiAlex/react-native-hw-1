/** @format */

import { createStackNavigator } from "@react-navigation/stack";
import { getLoggedIn } from "./src/Redux/Auth/selectors";

import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { Home } from "./Screens/Home";
import { useSelector } from "react-redux";
import { CreatePostsScreen } from "./Screens/CreatePostsScreen";
import { MapScreen } from "./Screens/MapScreen";
import { CommentsScreen } from "./Screens/CommentsScreen";

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
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{ headerShown: true }}
      />
      <MainStack.Screen
        name="Коментарі"
        component={CommentsScreen}
        options={{ headerShown: true }}
      />
      <MainStack.Screen
        name="Карта"
        component={MapScreen}
        options={{ headerShown: true }}
      />
    </MainStack.Navigator>
  );
};
