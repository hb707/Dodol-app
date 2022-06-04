import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Fontisto } from '@expo/vector-icons';
import { storeData } from '../Storages/storage';
import { ImageOptions } from '../types';

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: screen.width * 0.9,
  },
  thumbButton: {
    borderWidth: 3,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 125,
  },
  img: {
    width: screen.width * 0.9,
    height: screen.width * 0.9,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 30,
    margin: 25,
    marginTop: 50,
  },
});

const imageOptions: ImageOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 4],
  quality: 1,
};

function ThumbPicker() {
  type TImageState = string;
  const [imageUrl, setImageUrl] = useState<TImageState>();

  const GetPermission = async () => {
    try {
      const permission: ImagePicker.PermissionResponse =
        await ImagePicker.getCameraPermissionsAsync();
      if (!permission.granted) {
        if (!permission.canAskAgain) {
          Alert.alert('설정에서 카메라 접근을 허용해주세요');
          return;
        }
        const finalPermission =
          await ImagePicker.requestCameraPermissionsAsync();
        if (!finalPermission.granted) {
          Alert.alert('카메라 접근이 허용되지 않았습니다');
          return;
        }
      }
      const img = await ImagePicker.launchCameraAsync(imageOptions);
      if (!img.cancelled) {
        setImageUrl(img.uri);
        storeData('thumbUrl', img.uri);
      }
    } catch (e) {}
  };

  const PickImage = async () => {
    const img = await ImagePicker.launchImageLibraryAsync(imageOptions);
    if (!img.cancelled) {
      setImageUrl(img.uri);
      storeData('thumbUrl', img.uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.thumbButtons}>
        <Pressable onPress={PickImage} style={styles.thumbButton}>
          <Text
            style={{
              fontFamily: 'font1',
            }}
          >
            사진업로드
          </Text>
          <Fontisto name="photograph" size={24} color="black" />
        </Pressable>
        <Pressable onPress={GetPermission} style={styles.thumbButton}>
          <Text
            style={{
              fontFamily: 'font1',
            }}
          >
            카메라
          </Text>
          <Fontisto name="camera" size={24} color="black" />
        </Pressable>
      </View>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.img} />}
    </View>
  );
}

export default ThumbPicker;
