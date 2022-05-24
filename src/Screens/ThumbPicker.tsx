import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Fontisto } from '@expo/vector-icons';

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

const imageOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
};

function ThumbPicker() {
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
      {image && <Image source={{ uri: image }} style={styles.img} />}
    </View>
  );
}

export default ThumbPicker;
