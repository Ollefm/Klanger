import { View, Text, Button, StyleSheet } from 'react-native';
import { reactiveModel } from "src/bootstrapping"; // src/boostrapping also works
import { fetchData } from "../../api/api";

// TODO pass reactive model down to presenters
export default function IndexPage() {
  return (
    <View>
      <Text>Hello React Native!</Text>
      <Button title="Press to test API (Check console)" onPress={() => fetchData('https://api.deezer.com/track/3135556')
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching data:', error))}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
  });