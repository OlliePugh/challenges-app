import { StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import Camera from "../components/Camera";
import { Stack, useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { uploadVideos } from "../redux/slices/challengeVideoSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../redux/state/store";
import { useState } from "react";

export default function InGameScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <View style={{ paddingTop: insets.top }}>
        <Text style={styles.challenge}>
          Your challenge is to do somethign that is funny to record idk man
        </Text>
      </View>
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => {
          dispatch(uploadVideos());
          navigation.goBack();
        }}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
      <Camera />
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
  doneButton: {
    position: "absolute",
    backgroundColor: "blue",
    bottom: 20,
    zIndex: 10,
    width: "60%",
  },
  doneButtonText: {
    fontSize: 28,
    textAlign: "center",
  },
  challenge: {
    fontSize: 24,
  },
});
