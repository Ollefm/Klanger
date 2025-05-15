import { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Button } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PlayPreviewContainer({ onPress, progress, playPause}) {

  const handlePlayPress = () => {
      onPress();
  }

  const disablebutton = progress === 100;
  
  return (
    <View
      style={styles.previewContainer}>
      <ProgressBar
        progress={progress}
        innerBackgroundColor={"white"}
        outerBackgroundColor="#595959"
      />
      <TouchableOpacity onPress={handlePlayPress} 
       style={[styles.playButton, disablebutton && styles.disabledButton]} 
       disabled={disablebutton}
      >
        {playPause ? (
          <Ionicons
            name="pause"
            color="black"
            size={28}
          />
        ) : (
          <Ionicons
            name="play"
            color="black"
            size={28}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    elevation: 8,
    flexDirection: 'column', // ➜ makes children align in a row
    alignItems: 'center', // optional: vertically align items
    gap: 20,
    width: 340
  },
  playButton: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 99
  }, disabledButton: {
    backgroundColor: "#F0F0F0",
    opacity: 0.7
  }
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
