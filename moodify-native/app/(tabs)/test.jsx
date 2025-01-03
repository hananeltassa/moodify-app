import React from 'react';
import { SafeAreaView } from 'react-native';
import AudioPlayer from '../../components/AudioPlayer';

const test = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AudioPlayer />
    </SafeAreaView>
  );
};

export default test;
