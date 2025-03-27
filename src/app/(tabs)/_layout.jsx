import { Text } from "react-native"
import { Tabs } from "expo-router"
import { observer } from "mobx-react-lite"

export default observer(function RootLayout() {
  return (
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
        </Tabs>
      
    
  )
})
