import { Text, View } from "react-native"
import { Image } from "expo-image"

export function SuspenseView(props) {
  return (
    (!props.promise && (
      <View>
        <Text>No data</Text>
      </View>
    )) ||
    (props.error && (
      <View>
        <Text>{props.error.toString()}</Text>
      </View>
    )) ||
    (props.promise && (
      <View>
        <Image
          source="https://brfenergi.se/iprog/loading.gif"
          style={{ width: 50, height: 50 }}
        />
      </View>
    ))
  )
}
