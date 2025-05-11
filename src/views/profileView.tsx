import {SafeAreaView, View, Text, StyleSheet} from "react-native"
import AppProfileBar from "../app/custom components/appProfileBar";
export function ProfileView(props) {
    return (
            <SafeAreaView style={styles.background}>
              <View style = {styles.Container}>
                <AppProfileBar username={props.user.username} email={props.user.email}/>
              </View>
            </SafeAreaView>
          );
        }
        
        const styles = StyleSheet.create({
          background: {
            backgroundColor: "#0D0D0D",
            flex:1,
            alignItems:"center"
          },
          Container: {
            borderRadius: 16,
            paddingHorizontal: 15,
            paddingVertical: 18,
            width: "95%",
            backgroundColor:"#1C1C1C"
          },
          coverImage: {
            backgroundColor: "#333333",
            height: '35%',
            width: '60%',
            borderRadius: 20,
          },
          header: {
            color: "white",
            fontSize: 24,
            fontWeight: 700,
            textAlign: "left",
            flexDirection:'row',
            margin: 20
          },
        });