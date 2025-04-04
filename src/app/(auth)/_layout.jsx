import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0D0D0D" }, // Dark Gray Header
        headerTintColor: "white", // White Title & Back Button
        headerTitleStyle: { fontSize: 28,
            fontWeight: 'bold' }, // Customize title font
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false, title: "Start"}} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
  );
}