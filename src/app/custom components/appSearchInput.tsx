import { TextInput, StyleSheet, View, Button } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AppSearchInput({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={"search"} color={'#B0B0B0'} size={20} style={{paddingHorizontal:5}}/>
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
    borderRadius: 12, 
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection:'row',
    marginHorizontal: 25,
    marginVertical: 15
  },
  input: {
    fontSize: 14,
    color: "white", 
    width: "100%",
  },
});
