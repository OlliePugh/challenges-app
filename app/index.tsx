import { ScrollView, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { Stack } from "expo-router";

import useAuthenticated from "../hooks/useAuthenticated";
import HomePost from "../components/HomePost";

export default () => {
  useAuthenticated();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      <ScrollView style={styles.scrollView}>
        <HomePost />
      </ScrollView>
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
  scrollView: {
    width: "100%",
  },
});
