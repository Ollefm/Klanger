import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import AppPrimaryButton from "../../app/custom components/appPrimaryButton";
import AppTextInput from "../../app/custom components/appInput";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function LoginView(props) {
    const router = useRouter();

    useEffect(() => {
      if (props.isAuthenticated) {
        router.navigate("(tabs)");
      }
    }, [props.isAuthenticated]);

  function handleLogin(e){
    props.handleLogin(e)
  };

  function handleSkipLogin(e){
    router.navigate("(tabs)");
  };
  
  function setEmailCB(e){
    props.setEmail(e)
  }

  function setPasswordCB(e){
    props.setPassword(e)
  }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
        <AppTextInput placeholder="Email" value={props.email || ""} onChangeText={setEmailCB} secureTextEntry={undefined}/>
        <AppTextInput placeholder="Password" secureTextEntry value={props.password || "" } onChangeText={setPasswordCB} />
        {props.promiseState.error && <Text style={styles.errorText}>{props.promiseState.error}</Text>}
        <AppPrimaryButton title="Login" onPress={handleLogin} />
        <AppPrimaryButton title="Skip Login" onPress={handleSkipLogin} />
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