import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const dots = ['.', '..', '...', '....'];

function OpenLoading() {
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecond(second + 1);
    }, 300);

    return () => {
      clearInterval(intervalId);
    };
  }, [second]);

  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: 'white', fontSize: 30, fontFamily: 'font1' }}>
          캡슐 오픈중
        </Text>
        <Text style={{ color: 'white', fontSize: 30, fontFamily: 'font1' }}>
          {dots[second % 4]}
        </Text>
      </View>
    </View>
  );
}

export default OpenLoading;
