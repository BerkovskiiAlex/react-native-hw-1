/** @format */

import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";
import { PostsScreen } from "./PostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { logout } from "../src/Redux/Auth/AuthSlice";

const Tabs = createBottomTabNavigator();
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

export const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <Tabs.Navigator
      initialRouteName="Публікації"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Публікації") {
            iconName = "grid-outline";
          } else if (route.name === "Створити публікацію") {
            iconName = "add-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }
          const additionalStyles = focused
            ? {
                borderRadius: 20,
                backgroundColor: "#FF6C00",
                width: 70,
                height: 40,
                marginTop: 10,
                marginBottom: 10,
              }
            : {};
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={[
                additionalStyles,
                { textAlign: "center", lineHeight: 40 },
              ]}
            />
          );
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#212121",
      })}
    >
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerTitle: () => (
            <View style={styles.header}>
              <Text style={styles.headerTextHidden}>hidden</Text>
              <Text style={styles.headerText}>Публікації</Text>
              <Ionicons
                name="log-out-outline"
                size={24}
                style={styles.headerIconPosts}
                onPress={handleLogout}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          headerTitle: () => (
            <View style={styles.header}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                style={styles.headerIconArrowBack}
              />
              <Text style={styles.headerText}>Створити публікацію</Text>
              <Text style={styles.headerTextHidden}>hidden</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  headerTextHidden: {
    opacity: 0,
  },
  headerIconPosts: {
    color: "#BDBDBD",
  },
  headerIconArrowBack: {
    color: "#212121CC",
  },
});
