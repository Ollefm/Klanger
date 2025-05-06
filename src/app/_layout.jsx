import { Stack } from "expo-router";
import { observer } from "mobx-react-lite";
import { reactiveModel } from "../bootstrapping";

export default observer(function Layout() {
  const isLoggedIn = reactiveModel.isAuthenticated;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
});
