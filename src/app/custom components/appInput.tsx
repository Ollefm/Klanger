import { TextInput, StyleSheet, View } from "react-native";

export default function AppTextInput({ value, onChangeText, placeholder, secureTextEntry }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#303030", // Dark gray background
    borderRadius: 12, 
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: 340,
  },
  input: {
    fontSize: 16,
    color: "white", 
    width: "100%",
  },
});
