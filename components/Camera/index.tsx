import { StyleSheet, TouchableOpacity } from "react-native";

import {
  Camera as ExpoCamera,
  CameraType,
  VideoStabilization,
} from "expo-camera";

import { View } from "../../components/Themed";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface CameraProps {
  addVideo?: (videoUri: Promise<{ uri: string }>) => void;
  isActive: boolean;
}

const Camera = ({ addVideo, isActive }: CameraProps) => {
  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, requestCameraPermission] =
    ExpoCamera.useCameraPermissions();
  const [audioPermission, requestAudioPermission] =
    ExpoCamera.useMicrophonePermissions();
  const cameraRef = useRef<ExpoCamera>(null);
  const isRecording = useRef(false);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  useEffect(() => {
    return () => stopRecording(); // stop recording on unmount
  }, []);

  useEffect(() => {
    console.log("active changed", isActive);
    isActive ? startRecording() : stopRecording();
  }, [isActive]);

  useEffect(() => {
    console.log("camera changed");
    if (isRecording.current) {
      startRecording(true);
    }
  }, [type]);

  const startRecording = (switchCamera = false) => {
    if (isRecording.current && !switchCamera) return;
    isRecording.current = true;
    console.log("STARTING RECORDING");
    cameraRef.current?.resumePreview();
    const promise = cameraRef.current!.recordAsync({
      maxDuration: 60,
      quality: "720p",
    });
    addVideo?.(promise);
  };

  const stopRecording = () => {
    if (!isRecording.current) return;
    console.log("STOP RECORDING");
    cameraRef.current!.stopRecording();
    isRecording.current = false;
    // cameraRef.current?.pausePreview();
  };

  if (!cameraPermission) {
    requestCameraPermission();
  }

  if (!audioPermission) {
    requestAudioPermission();
  }

  if (!cameraPermission?.granted || !audioPermission?.granted) {
    requestCameraPermission();
    requestAudioPermission();
    console.log("user has not accepted perms therefore cannot continue");
  }

  return (
    <ExpoCamera
      videoStabilizationMode={VideoStabilization.off}
      style={styles.camera}
      type={type}
      ref={cameraRef}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity disabled onPress={toggleCameraType}>
          <Ionicons name="sync" size={48} color="blue" />
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
