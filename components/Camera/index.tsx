import { StyleSheet, TouchableOpacity } from "react-native";

import { Camera as ExpoCamera, CameraType } from "expo-camera";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Camera = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = ExpoCamera.useCameraPermissions();
  const cameraRef = useRef<ExpoCamera>(null);

  //   const startRecording = () => {
  //     cameraRef.current?.recordAsync().then(console.log);
  //   };

  if (!permission) {
    requestPermission();
  }

  if (!permission?.granted) {
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <ExpoCamera
      style={styles.camera}
      type={type}
      //   onCameraReady={startRecording}
      ref={cameraRef}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleCameraType}>
          <Ionicons name="sync" size={48} color="blue" />
          {/* <Text>Flip Camera</Text> */}
        </TouchableOpacity>
      </View>
    </ExpoCamera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 48,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default Camera;
