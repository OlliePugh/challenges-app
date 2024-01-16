import { useEffect, useRef, useState } from "react";
import { Text, View } from "../Themed";
import { Video, ResizeMode, AVPlaybackStatusSuccess, Audio } from "expo-av";
import { Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";

export default () => {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatusSuccess>();
  const [downloadUrl, setDownloadUrl] = useState<string>();

  useEffect(() => {
    const storageRef = ref(
      storage,
      "videos/rAIg88cymcXM23eH7OdOrF5Suvt2/01-16-2024.mp4"
    );

    console.log("get download url");
    // Get the download URL
    getDownloadURL(storageRef)
      .then((url) => {
        setDownloadUrl(url);
      })
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <Link href={"/in-game"}>Go To Game</Link>
      <Text>Player Name</Text>
      <Text>Notes</Text>
      <Text>Score</Text>
      {downloadUrl && (
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: downloadUrl,
          }}
          onLoad={async () => {
            await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
          }}
          isMuted={false}
          usePoster={true}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => {
            // @ts-ignore
            if (status?.error) {
              console.log(status);
              console.error("Video failed to load");
            }
            setStatus(status as AVPlaybackStatusSuccess);
          }}
        />
      )}
      <View>
        <Button
          title={status?.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status?.isPlaying
              ? video.current!.pauseAsync()
              : video.current!.playAsync()
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  video: {
    width: "100%",
    height: 650,
  },
});
