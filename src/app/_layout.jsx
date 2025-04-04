import { Stack } from "expo-router";
import { observer } from "mobx-react-lite";
import { reactiveModel } from "../bootstrapping";

export default observer(function Layout() {
  console.log(reactiveModel.isAuthenticated)
  return (
    <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name="(auth)" />
     </Stack>
  );
})
