import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0D0D0D" }, 
        headerTintColor: "white", 
        headerTitleStyle: { fontSize: 28,
            fontWeight: 'bold' }, 
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false, title: "Start"}} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
}