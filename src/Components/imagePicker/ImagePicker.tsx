import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Fontisto } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: SCREEN_WIDTH,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomColor: '#aeaeae',
    borderBottomWidth: 0.5,
    borderTopColor: '#aeaeae',
    borderTopWidth: 0.5,
    paddingLeft: 20,
    backgroundColor: 'blue',
  },
  thumbButton: {
    width: 100,
    height: 70,
    margin: 15,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#aeaeae',
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 100,
    height: 70,
    margin: 15,
    borderRadius: 15,
  },
  text: {
    paddingTop: 10,
    paddingLeft: 20,
    borderTopColor: '#aeaeae',
    borderTopWidth: 1,
  },
  delBtn: {
    position: 'absolute',
    top: 5,
    left: 100,
    backgroundColor: '#ffffff',
    borderRadius: 13,
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

  const [image, setImage] = useState([]);
  const status = ImagePicker.useCameraPermissions();

  const pickImage = async () => {
    const img = await ImagePicker.launchImageLibraryAsync({
      imageOptions,
    });
    if (!img.cancelled) {
      const newArr = [...image];
      if (newArr.length < 4) newArr.push(img.uri);

      setImage(newArr);
      onChangeImg(newArr);
    }
  };

  const deleteImage = async (idx: number) => {
    const newArr = [...image];
    newArr.splice(idx, 1);
    setImage(newArr);
    onChangeImg(newArr);
  };
  return (
    <>
      <Text style={styles.text}>이미지 {image.length}/4</Text>
      <ScrollView
        horizontal
        style={{
          borderBottomColor: '#aeaeae',
          borderBottomWidth: 1,
        }}
      >
        {image.length < 4 && (
          <Pressable onPress={pickImage} style={styles.thumbButton}>
            {/* <Text>사진</Text> */}
            <Fontisto name="camera" size={24} color="black" />
          </Pressable>
        )}
        {image[0] && (
          <View style={{ position: 'relative' }}>
            <Image source={{ uri: image[0] }} style={styles.img} />
            <Pressable style={styles.delBtn} onPress={() => deleteImage(0)}>
              <Fontisto name="close" size={24} color="black" />
            </Pressable>
          </View>
        )}
        {image[1] && (
          <View>
            <Image source={{ uri: image[1] }} style={styles.img} />
            <Pressable style={styles.delBtn} onPress={() => deleteImage(1)}>
              <Fontisto name="close" size={24} color="black" />
            </Pressable>
          </View>
        )}
        {image[2] && (
          <View>
            <Image source={{ uri: image[2] }} style={styles.img} />
            <Pressable style={styles.delBtn} onPress={() => deleteImage(2)}>
              <Fontisto name="close" size={24} color="black" />
            </Pressable>
          </View>
        )}
        {image[3] && (
          <View>
            <Image source={{ uri: image[3] }} style={styles.img} />
            <Pressable style={styles.delBtn} onPress={() => deleteImage(3)}>
              <Fontisto name="close" size={24} color="black" />
            </Pressable>
          </View>
        )}
      </ScrollView>
    </>
  );
}

export default ImgPicker;
