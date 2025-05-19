import { Stack, Redirect } from "expo-router";
import { observer } from "mobx-react-lite";

export default observer(function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "black" }, 
        headerTintColor: "white", 
        headerTitleStyle: { fontSize: 28,
            fontWeight: 'bold' }, 
      }}
    >
        
      <Stack.Screen name="index" options={{ headerShown: false, title: "Home"}} />
      <Stack.Screen name="searchUsers" options={{ title: "" }} />
      <Stack.Screen name="instructions" options={{ title: "Instructions" }} />
      <Stack.Screen name="guessSong" options={{ title: "Play time", headerBackVisible: false }} />
      <Stack.Screen name="newGame" options={{title: "New Game"}}></Stack.Screen>
      <Stack.Screen name="gameOver" options={{ title: "Game Over", headerBackVisible: false  }} />
      <Stack.Screen name ="multiPlayerGameOverview" options={{ title: "Game result", headerBackVisible: false  }}></Stack.Screen>
    </Stack>
  );
})