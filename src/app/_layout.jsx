import { Stack } from "expo-router";
import { observer } from "mobx-react-lite";
import { reactiveModel } from "../bootstrapping";

export default observer(function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
    </Stack>
  );
})
