import { StyleSheet, TouchableOpacity, Text, View, Button } from "react-native";
import styled from "styled-components/native";


export default function PlayPreviewContainer({ onPress, time }) {
  return (
    <View
      style={styles.previewContainer}>
      <TouchableOpacity onPress={onPress} style={styles.playButton}>
        <View style={styles.playIcon} />
      </TouchableOpacity>

      <ProgressBar
        progress={time}
        innerBackgroundColor="white"
        outerBackgroundColor="#595959"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    elevation: 8,
    flexDirection: 'row', // ➜ makes children align in a row
    alignItems: 'center', // optional: vertically align items
  },
  playButton: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  playIcon: {
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 12,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#fff",
  },
})

const ProgressBar = ({
  progress,
  height = 12,
  outerBackgroundColor,
  innerBackgroundColor,
  padded = true,
}) => (
  <Container
    height={height}
    padded={padded}
    outerBackgroundColor={outerBackgroundColor}
  >
    <Content
      height={height}
      padded={padded}
      progress={progress}
      innerBackgroundColor={innerBackgroundColor}
    />
  </Container>
);

// Define an interface for Container's props
interface ContainerProps {
  height: number;
  padded: boolean;
  outerBackgroundColor: string;
}

const Container = styled.View<ContainerProps>`
  width: 90%;
  border-radius: 16px;
  align-items: flex-start;
  justify-content: center;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.outerBackgroundColor};
  padding-horizontal: ${(props) => (props.padded ? 3 : 0)}px;
`;

// Define an interface for Content's props
interface ContentProps {
  height: number;
  padded: boolean;
  progress: number;
  innerBackgroundColor: string;
}

const Content = styled.View<ContentProps>`
  border-radius: 16px;
  height: ${(props) => (props.padded ? props.height / 2 : props.height)}px;
  background-color: ${(props) => props.innerBackgroundColor};
  width: ${(props) => props.progress}%;
`;
