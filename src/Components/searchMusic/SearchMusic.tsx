import React, { ReactElement, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import youtubeAPI, { YoutubeResultAttribute } from '../../api/youtubeAPI';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
  },
  cameraBtn: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#aeaeae',
  },
  input: {
    width: SCREEN_WIDTH * 0.9,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    borderWidth: 3,
    borderColor: '#000000',
    // backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 15,
    fontFamily: 'font1',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtn: {
    flex: 1,
    backgroundColor: 'orange',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#000000',
  },
  title: {
    fontSize: 16,
    // paddingHorizontal: 20,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 15,
  },
});

function SearchMusic({ onChangeMusic }: { onChangeMusic(v: string): void }) {
  // state
  const [searchValue, setSearchValue] = useState('');
  const [searchResultArray, setSearchResultArray] = useState<
    YoutubeResultAttribute[]
  >([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<boolean>(false);

  // setState
  const onChangeSearch = (payload: string) => setSearchValue(payload);
  const searchRequest = (payload: string) => async () => {
    const searchResult = await youtubeAPI(payload);
    setSearchResultArray(searchResult);
  };
  const minusIndex = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setSelected(false);
  };

  const plusIndex = () => {
    if (index === 4) return;
    setIndex(index + 1);
    setSelected(false);
  };

  // render item
  const searchResultRender = (currentIndex: number): ReactElement => {
    const { videoId } = searchResultArray[currentIndex];
    const { thumbnail } = searchResultArray[currentIndex];
    let { title } = searchResultArray[currentIndex];

    if (title.length > 25) {
      title = `${title.substring(0, 26)}...`;
    }

    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: SCREEN_WIDTH,
          position: 'relative',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: SCREEN_WIDTH * 0.7,
            zIndex: 2,
            top: 0,
            left: 0,
          }}
        >
          <Pressable style={{ justifyContent: 'center' }} onPress={minusIndex}>
            <View
              style={{
                width: 60,
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="navigate-before" size={60} color="white" />
            </View>
          </Pressable>
          <Pressable
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 0.6 * SCREEN_WIDTH,
              height: 0.6 * SCREEN_WIDTH,
              backgroundColor: selected ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.1)',
              borderRadius: 0.3 * SCREEN_WIDTH,
            }}
            onPress={() => {
              onChangeMusic(videoId);
              setSelected(true);
            }}
          >
            <Text
              style={{ color: '#ffffff', fontSize: 20, fontFamily: 'font1' }}
            >
              {selected ? '이 노래가 맞아요!' : '선택'}
            </Text>
          </Pressable>
          <Pressable style={{ justifyContent: 'center' }} onPress={plusIndex}>
            <View
              style={{
                width: 60,
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="navigate-next" size={60} color="white" />
            </View>
          </Pressable>
        </View>

        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            zIndex: 1,
          }}
        >
          <Image
            style={{
              width: 0.6 * SCREEN_WIDTH,
              height: 0.6 * SCREEN_WIDTH,
              marginBottom: 20,
              borderRadius: 0.45 * SCREEN_WIDTH,
            }}
            source={{
              uri: thumbnail,
            }}
          />
          <Text style={{ fontSize: 16, fontFamily: 'font1' }}>{title}</Text>
        </View>
      </View>
    );
  };

  // component
  return (
    <View style={{ flex: 6, alignItems: 'center', marginBottom: 30 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 0.9 * SCREEN_WIDTH,
          marginBottom: 20,
        }}
      >
        <TextInput
          placeholder="가수와 곡명을 입력해주세요."
          style={{
            ...styles.input,
            width: 0.65 * SCREEN_WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onChangeText={onChangeSearch}
        />
        <Pressable onPress={searchRequest(searchValue)}>
          <View
            style={{
              ...styles.submitBtn,
              width: SCREEN_WIDTH * 0.2,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontFamily: 'font1', color: '#ffffff' }}>검색</Text>
          </View>
        </Pressable>
      </View>
      {searchResultArray.length !== 0 && searchResultRender(index)}
    </View>
  );
}

export default SearchMusic;
