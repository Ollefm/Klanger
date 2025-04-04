import {StyleSheet, TouchableOpacity, Text } from "react-native";

export default function AppSecondaryButton({ onPress, title }){
    return(
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

  const styles = StyleSheet.create({
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#313131",
      borderRadius: 99,
      paddingVertical: 15,
      width: 340,
      alignItems: 'center',
    },
    appButtonText: {
      fontSize: 18,
      color: "white",
      alignSelf: "center",
      fontWeight: 600
    }
  });