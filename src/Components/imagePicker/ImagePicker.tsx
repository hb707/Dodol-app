import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Fontisto } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomColor: '#aeaeae',
    borderBottomWidth: 1,
    borderTopColor: '#aeaeae',
    borderTopWidth: 1,
    paddingLeft: 20,
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
    width: 100,
    height: 70,
    margin: 25,
    borderRadius: 15,
  },
});

const imageOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
};

function ImgPicker({ onChangeImg }) {
  // const initialValue = './73bf92ba5c10596abbf4449fbba4165c.jpg'

  const [image, setImage] = useState();
  const status = ImagePicker.useCameraPermissions();

  const GetPermission = async () => {
    if (!status.granted) {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
    }
    const img = await ImagePicker.launchCameraAsync({ imageOptions });
    if (!img.cancelled) {
      setImage(img.uri);
    }
  };

  const PickImage = async () => {
    const img = await ImagePicker.launchImageLibraryAsync({ imageOptions });
    if (!img.cancelled) {
      setImage(img.uri);
      onChangeImg(img.uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.thumbButtons}>
        <Pressable onPress={PickImage} style={styles.thumbButton}>
          <Text>사진</Text>
          <Fontisto name="photograph" size={24} color="black" />
        </Pressable>
        {image && (
          <View>
            <Image source={{ uri: image }} style={styles.img} />
            {/* <Pressable>
              <Fontisto name="close" size={24} color="black" />
            </Pressable> */}
          </View>
        )}
      </View>
    </View>
  );
}

export default ImgPicker;
