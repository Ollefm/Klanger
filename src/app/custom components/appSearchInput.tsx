import { TextInput, StyleSheet, View, Button } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AppSearchInput({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={"search"} color={'#B0B0B0'} size={22} style={{paddingHorizontal:5}}/>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#303030",
    borderRadius: 16, 
    paddingHorizontal: 15,
    paddingVertical: 18,
    width: 340,
    flexDirection:'row'
  },
  input: {
    fontSize: 16,
    color: "white", 
    width: "100%",
  },
});
