import { Text } from "react-native"
import { Tabs } from "expo-router"
import { observer } from "mobx-react-lite"

export default observer(function RootLayout() {
  return (
    <>
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: function renderIndexTabIconACB() {
                return <Text>🕶️</Text>
              },
            }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="quiz"
            options={{
              title: "Quiz",
              tabBarIcon: function renderQuizIconACB() {
                return <Text>🎵</Text>
              },
            }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="recommend"
            options={{
              title: "Recommend",
              tabBarIcon: function renderRecommendIconACB() {
                return <Text>😃</Text>
              },
            }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: function renderProfileIconACB() {
                return <Text>👤</Text>
              },
            }}
          ></Tabs.Screen>
          
        </Tabs>
      
    </>
  )
})
