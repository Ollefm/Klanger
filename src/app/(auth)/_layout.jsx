import { Stack, Redirect } from "expo-router";
import { observer } from "mobx-react-lite";
import { reactiveUserModel } from "../../bootstrapping";

export default observer(function AuthLayout() {
  const user = reactiveUserModel.user
  if (user) {
    return <Redirect href="/(tabs)" />;
  }
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
})