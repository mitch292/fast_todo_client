import { StyleSheet } from "react-native-web";

export const authStyles = StyleSheet.create({
  container: {
    padding: 60,
    display: "flex",
    alignItems: "center",
  },
  headerContainer: {
    marginBottom: 50,
    marginTop: 30,
  },
  header: {
    fontSize: 36,
    color: "#002b36",
    marginBottom: 10,
    alignSelf: "center",
  },
  subHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  subHeader: {
    fontSize: 18,
    color: "#586e75",
    display: "flex",
    alignItems: "center",
  },
  cardContainer: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  formGroup: {
    marginBottom: 25,
  },
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  inputContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  inputLabel: {
    color: "#586e75",
    marginBottom: 3,
  },
  formError: {
    color: "#dc322f",
    marginTop: 5,
  },
  buttonContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "#268bd2",
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    width: 250,
    elevation: 4,
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 60,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
