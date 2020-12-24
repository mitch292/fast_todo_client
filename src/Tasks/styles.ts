import { StyleSheet } from "react-native-web";

export const taskStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  itemContainer: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  },
  baseCategory: {
    padding: 5,
    maxWidth: 300,
    minWidth: 300,
    marginLeft: 10,
    color: "#002b36",
  },
  actionIcon: {
    color: "#268bd2",
    paddingHorizontal: 10,
    borderEndColor: "#002b36",
    borderEndWidth: 1,
    opacity: 0.5,
  },
  negativeIcon: {
    paddingHorizontal: 10,
    color: "#dc322f",
    opacity: 0.5,
  },
  checkMark: {
    paddingVertical: 5,
    // downstream components explicitly overwrite left and right occasionally
    paddingLeft: 10,
    paddingRight: 10,
  },
  error: {
    color: "#dc322f",
    opacity: 0.8,
  },
  textInput: {
    padding: 5,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
