import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import AppPrimaryButton from "../../app/custom components/appPrimaryButton";
import AppTextInput from "../../app/custom components/appInput";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function RegisterView(props) {
    const router = useRouter();

    useEffect(() => {
      if (props.isAuthenticated) {
        router.navigate("(tabs)");
      }
    }, [props.isAuthenticated]);
    
    function handleRegister(e){
        props.handleRegister(e)
      };
      
      function setEmailCB(email : string){
        props.setEmail(email)
      }

      function setUsernameCB(username : string){
        console.log(username)
        props.setUsername(username)
      }
    
      function setPasswordCB(password : string){
        props.setPassword(password)
      }
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.buttonContainer}>  
    <AppTextInput placeholder="Email" value={props.email || ""} onChangeText={setEmailCB} secureTextEntry={false} />
    <AppTextInput placeholder="Username" secureTextEntry={false} value={props.username || ""} onChangeText={setUsernameCB} />
      <AppTextInput placeholder="Password" secureTextEntry value={props.password || ""} onChangeText={setPasswordCB} />
      {props.promiseState.error && <Text style={styles.errorText}>{props.promiseState.error}</Text>}
      <AppPrimaryButton title="Register" onPress={handleRegister}/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center", 
  },
  errorText:{
    color: "#ED4337"
  }

});
