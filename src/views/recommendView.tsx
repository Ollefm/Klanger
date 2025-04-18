import { SafeAreaView, View, Text, StyleSheet, Image} from "react-native";
import AppSearchInput from "../app/custom components/appSearchInput";
export function RecommendView(props) {
      return (
        <View style={styles.background}>

          <AppSearchInput
            placeholder="Enter a song, album or artist"
            value={props.text || ""}
            onChangeText={""}
          />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      background: {
        backgroundColor: "#0D0D0D",
        alignItems: "center",
      },

  
    });