import { Tabs, Redirect } from "expo-router";
import { observer } from "mobx-react-lite";
import Ionicons from "@expo/vector-icons/Ionicons";
import { reactiveUserModel } from "../../bootstrapping";

export default observer(function TabsLayout() {
  const user = reactiveUserModel.user
  if (!user) {
    return <Redirect href="/(auth)/" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        headerStyle: {
          backgroundColor: "#0D0D0D",
        },
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontSize: 32,
          fontWeight: "bold",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#1C1C1C",
          position: "absolute",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="searchUsers"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
});
