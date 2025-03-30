import {StyleSheet, TouchableOpacity, Text } from "react-native";

export default function AppPrimaryButton({ onPress, title }){
    return(
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

  const styles = StyleSheet.create({
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "yellow",
      borderRadius: 99,
      paddingVertical: 15,
      paddingHorizontal: 100
    },
    appButtonText: {
      fontSize: 18,
      color: "black",
      alignSelf: "center",
      fontWeight: 600
    }
  });