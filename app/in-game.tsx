import {
  Button,
  StyleSheet,
  TouchableOpacity,
  useAnimatedValue,
} from "react-native";
import { Text, View } from "../components/Themed";
import { Link, Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/state/store";
import Camera from "../components/Camera";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
import { auth } from "../firebase/firebase";
import useAuthenticated from "../hooks/useAuthenticated";

export default () => {
  const [inGame, setInGame] = useState(false);
  const [videos, setVideos] = useState<Array<Promise<{ uri: string }>>>([]);
  const { user } = useSelector((state: RootState) => state.user);
  useAuthenticated();

  const processVideos = async () => {
    const uris = (await Promise.all(videos)).map((x) => x.uri); // all videos saved to drive

    setVideos([]);
    uris.forEach(async (uri) => {
      try {
        const result = await FileSystem.uploadAsync(
          "http://192.168.1.85:5001/challenges-8d7aa/us-central1/uploadVideo",
          uri,
          {
            headers: {
              Authorization: await auth.currentUser!.getIdToken(),
            },
            fieldName: "file",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          }
        );
        console.log(result.body);
      } catch (e) {
        console.error(e);
      }
    });
  };

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

      {!inGame && (
        <View style={styles.getReadyContainer}>
          <Text>Get Ready</Text>
          <Button onPress={() => setInGame(true)} title="Go" />
        </View>
      )}
      <Camera
        isActive={inGame}
        addVideo={(video) => setVideos((videos) => [...videos, video])}
      />
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => {
          console.log("DONE GAME OVER");
          setInGame(false);
          processVideos();
        }}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
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
  getReadyContainer: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white",
  },
});
