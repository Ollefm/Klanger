import {SafeAreaView, View, Text, StyleSheet} from "react-native"
import AppProfileBar from "../app/custom components/appProfileBar";
export function ProfileView(props) {
    return (
            <SafeAreaView style={styles.background}>
                <AppProfileBar username={props.username}/>
                <Text style={styles.header}>Quiz score: 9000</Text>
                <Text style={styles.header}>Place on leader board: 1</Text>
                <Text style={styles.header}>Liked Tracks</Text>
            </SafeAreaView>
          );
        }
        
        const styles = StyleSheet.create({
          background: {
            backgroundColor: "#0D0D0D",
            flex:1
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