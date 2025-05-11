import { Stack, Slot } from "expo-router";
import { observer } from "mobx-react-lite";

export default observer(function RootLayout() {

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Slot></Slot>
    </Stack>
  );
});
