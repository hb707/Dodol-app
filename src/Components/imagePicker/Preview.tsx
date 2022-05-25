import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  img: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
});

function Preview({ image, style }: { image: string[]; style: any }) {
  const item = () =>
    image.map((v, i) => (
      <View style={{ width: SCREEN_WIDTH }} key={i}>
        <Image source={{ uri: v }} style={styles.img} />
      </View>
    ));

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ height: 250, ...style }}
    >
      {image.length !== 0 ? (
        item()
      ) : (
        <View
          style={{
            width: SCREEN_WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>타임캡슐에 사진을 추가해보세요!</Text>
        </View>
      )}
    </ScrollView>
  );
}

export default Preview;
