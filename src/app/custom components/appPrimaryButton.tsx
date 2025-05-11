import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AppPrimaryButton({ onPress, title }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
      <LinearGradient
        colors={["#4D8DEA", "#4896DB", "#90C1ED"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 16,
    overflow: "hidden",
  },
  appButtonContainer: {
    paddingVertical: 15,
    width: 340,
    alignItems: "center",
    justifyContent: "center",
  },
  appButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
});