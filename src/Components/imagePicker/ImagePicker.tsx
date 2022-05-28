import React, { useState } from 'react';
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

type OnChangeImg = (payload: string[]) => void;
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
    // paddingLeft: 20,
    backgroundColor: 'blue',
  },
  thumbButton: {
    width: 80,
    height: 80,
    margin: 12,
    marginLeft: 0,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#aeaeae',
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  img: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    // paddingHorizontal: 20,
    fontWeight: '700',
    marginTop: 20,
  },
  delBtn: {
    position: 'absolute',
    top: 5,
    left: 80,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 13,
  },
});

interface ImageOptions {
  mediaTypes: ImagePicker.MediaTypeOptions;
  allowsEditing: boolean;
  aspect: [number, number];
  quality: number;
}

const imageOptions: ImageOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [3, 3],
  quality: 1,
};

function ImgPicker({ onChangeImg }: { onChangeImg: OnChangeImg }) {
  type IImageState = string[];
  const [image, setImage] = useState<IImageState>([]);

  const pickImage = async () => {
    const img = await ImagePicker.launchImageLibraryAsync(imageOptions);
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
      <ScrollView horizontal>
        {image.length < 4 && (
          <Pressable onPress={pickImage} style={styles.thumbButton}>
            {/* <Text>사진</Text> */}
            <Fontisto name="camera" size={24} color="black" />
          </Pressable>
        )}
        {image[0] && (
          <View>
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
