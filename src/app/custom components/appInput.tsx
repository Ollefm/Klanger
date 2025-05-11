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
    backgroundColor: "transparent", // Dark gray background
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 16, 
    paddingHorizontal: 15,
    width: 340,
    height: 55,
  },
  input: {
    fontSize: 16,
    color: "white", 
    width: "100%",
    height: "100%",
  },
});
