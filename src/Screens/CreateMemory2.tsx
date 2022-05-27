import React, { useState } from 'react';
import { View, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ImagePicker from '../Components/imagePicker/MediaLibrary';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  MemoryList: { cIdx: 1 };
};

type Props = NativeStackScreenProps<RootStackParamList>;

function CreateMemoryScreen({ navigation, route }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello media library!</Text>
      <ImagePicker />
    </View>
  );
}

export default CreateMemoryScreen;
