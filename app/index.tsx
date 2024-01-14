import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Link, Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/state/store";

export default () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (user == null) {
    return <Redirect href="/auth/sign-in" />;
  }

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
