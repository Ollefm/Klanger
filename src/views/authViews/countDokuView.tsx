import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
export function CountDokuView(props) {
  return (
    <SafeAreaView style={styles.background}>
      <View style={{paddingVertical:150}}>
        <CountdownCircleTimer
          isPlaying = {props.isPlaying}
          duration={3}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[3, 2, 1, 0]}
          onComplete={() => props.setIsPlaying(prev => !prev)}
        >
          {({ remainingTime }) => <Text style={styles.bold}>{remainingTime}</Text>}
        </CountdownCircleTimer>
        <Text style={styles.bold}>Get ready!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#0D0D0D",
    flex: 1,
    alignItems:"center"
  },
  bold: {
    fontWeight: "bold",
    fontSize: 40,
    color: "white",
  },
});
