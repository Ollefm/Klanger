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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#303030", // Dark gray background
    borderRadius: 16, 
    paddingHorizontal: 15,
    paddingVertical: 18,
    width: 340,
  },
  input: {
    fontSize: 16,
    color: "white", 
  },
});
