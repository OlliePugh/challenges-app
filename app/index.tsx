import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Link, Stack } from "expo-router";

export default function PreGameScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Link href="/in-game">
        <Text>Lets play</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
