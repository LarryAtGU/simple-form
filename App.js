import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SimpleForm } from "./src/screens/SimpleForm";
export default function App() {
  return (
    <View style={styles.container}>
      <SimpleForm />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
