import { TextInput, StyleSheet, View, Button, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AppProfileBar({ username }) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={"person-circle-outline"} color={'white'} size={32} style={{paddingHorizontal:10}}/>
      <Text style={styles.input}>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 16, 
    paddingHorizontal: 15,
    paddingVertical: 18,
    width: 340,
    flexDirection:'row'
  },
  input: {
    fontSize: 26,
    color: "white", 
    width: "100%",
  },
});
