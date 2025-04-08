import { SafeAreaView, View, Text, StyleSheet, FlatList, Pressable} from "react-native";
import { Image } from "expo-image"
export function SuggestionsView(props) {
      return (
        <SafeAreaView style={styles.background}>
          <Text style={styles.header}>Suggestions</Text>
          <FlatList
          renderItem={renderSuggestionCardCB}
          data={props.searchResults}
          keyExtractor={(item) => item.id}
          numColumns={2}>
          </FlatList>
        </SafeAreaView>
      );
      function renderSuggestionCardCB(element) {
        const Suggestion = element.item
        return (
          <Pressable
            role="button"
            onPress={SuggestionChosenACB}
            style={styles.container}
          >
            <View
              style={{
                flex: 1,
                width: 150,
              }}
            >
              <Image
                source={Suggestion.album.cover}
                style={{ width: "100%", aspectRatio: 1, borderRadius: 8 }}
              />
            </View>
            <View >
              <Text numberOfLines={3} style={styles.text}>{Suggestion.title}</Text>
            </View>
          </Pressable>
        )
        function SuggestionChosenACB() {
        }
      }
    }

    const styles = StyleSheet.create({
      background: {
        flex: 1,
        backgroundColor: "#0D0D0D",
        alignItems: "center"
      },
      container: {
        backgroundColor: "#333333",
        padding: 10,
        borderRadius: 16,
        opacity: 0.75,
        margin: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center'
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
      },
      text:{
        color:"white",
      }
    });