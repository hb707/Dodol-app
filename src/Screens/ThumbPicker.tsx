import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Fontisto } from '@expo/vector-icons';
import { getThumb, storeThumb } from '../Storages/storage';
import { ImageOptions } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  thumbButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 220,
  },
  thumbButton: {
    width: '40%',
    borderWidth: 2,
    borderRadius: 15,
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 300,
    height: 250,
    margin: 25,
    marginTop: 50,
  },
});

const imageOptions: ImageOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
};

function ThumbPicker() {
  type TImageState = string;
  const [imageUrl, setImageUrl] = useState<TImageState>();
  const status = ImagePicker.useCameraPermissions();

  const GetPermission = async () => {
    if (!status.granted) {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
    }
    const img = await ImagePicker.launchCameraAsync(imageOptions);
    if (!img.cancelled) {
      setImageUrl(img.uri);
      storeThumb(img.uri);
    }
  };

  const PickImage = async () => {
    const img = await ImagePicker.launchImageLibraryAsync(imageOptions);
    if (!img.cancelled) {
      setImageUrl(img.uri);
      storeThumb(img.uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.thumbButtons}>
        <Pressable onPress={PickImage} style={styles.thumbButton}>
          <Text>사진업로드</Text>
          <Fontisto name="photograph" size={24} color="black" />
        </Pressable>
        <Pressable onPress={GetPermission} style={styles.thumbButton}>
          <Text>카메라</Text>
          <Fontisto name="camera" size={24} color="black" />
        </Pressable>
      </View>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.img} />}
    </View>
  );
}

export default ThumbPicker;
