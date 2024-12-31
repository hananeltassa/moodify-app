import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useCameraPermissions } from 'expo-camera';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, marginBottom: 20 }}>We need your permission</Text>
        <Text style={{ color: 'gray', fontSize: 14, textAlign: 'center', marginBottom: 20 }}>
          Please allow camera access to use this feature and capture moments effortlessly.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: '#007BFF',
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 25,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Grant Camera Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 18 }}>Camera permissions granted!</Text>
    </View>
  );
}
