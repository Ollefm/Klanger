import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AppSecondaryButton({ onPress, title }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    paddingVertical: 18,
    borderRadius: 16,
    width: 365,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "white"
  },
  appButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
});
