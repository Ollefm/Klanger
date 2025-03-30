import { Text } from "react-native";
import { Tabs } from "expo-router";
import { observer } from "mobx-react-lite";
import Ionicons from '@expo/vector-icons/Ionicons';

export default observer(function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        headerStyle: {
          backgroundColor: '#0D0D0D',
        },
        headerTitleAlign: 'left',
        headerTitleStyle:{
          fontSize: 32,
          fontWeight: 'bold'
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#1C1C1C',
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={24} />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'musical-notes' : 'musical-notes-outline'} color={color} size={24} />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="recommend"
        options={{
          title: "Recommend",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'sparkles' : 'sparkles-outline'} color={color} size={24} />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
});
