import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Button,
  Pressable,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const { width: SCREEN_WIDTH, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: 0.9 * SCREEN_WIDTH,
  },
  cameraBtn: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aeaeae',
  },
  input: {
    width: 0.9 * SCREEN_WIDTH,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    borderBottomColor: '#aeaeae',
    borderBottomWidth: 1,
  },
});

function CreateMemoryScreen({ navigation, route }: Props) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const onChangeText = (payload: string) => setText(payload);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <Text>사진</Text>
          <Pressable style={styles.cameraBtn}>
            <Ionicons name="camera" size={24} color="black" />
          </Pressable>
        </View>
        <TextInput
          value={text}
          onChangeText={onChangeText}
          style={{ ...styles.input, flex: 1 }}
          placeholder="제목"
        />
        <TextInput
          value={text}
          onChangeText={onChangeText}
          style={{ ...styles.input, flex: 8 }}
          placeholder="타임캡슐에 남기고 싶은 내용을 작성해주세요."
          textAlignVertical="top"
          textAlign="left"
        />
      </View>
    </View>
  );
}

export default CreateMemoryScreen;
