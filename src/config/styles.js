import { StyleSheet } from "react-native";

export const COLOR = {
  BUTTON: '#015880',
  WHITE: "#ffffff",
  BLACK: "#000",
  DANGER: "#FF5370",
  TEXT: "#015880",
  BORDER: "#BCE0FD",
  MAIN:'#F1F9FF'
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.MAIN,
    padding: 16
  },
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 100
  }
});

export default Styles;
