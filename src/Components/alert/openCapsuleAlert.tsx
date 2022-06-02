import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setDataToStorage } from '../../Storages/storage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface IProps {
  setAlert: () => void;
}

function OpenCapsuleAlert({ setAlert }: IProps) {
  const [noAlertAgain, setNoAlertAgain] = useState(false);

  useEffect(() => {
    setDataToStorage('@noAlertAgain', { value: noAlertAgain });
  }, [noAlertAgain]);

  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 250,
          height: 200,
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          paddingTop: 40,
          borderRadius: 15,
          borderWidth: 4,
        }}
      >
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#000', fontSize: 18, letterSpacing: -0.4 }}>
            병을 터치 해서
          </Text>
          <Text style={{ color: '#000', fontSize: 18, letterSpacing: 0.4 }}>
            캡슐에 추억을 담아 보세요.
          </Text>
        </View>
        <Pressable
          onPress={() => {
            setNoAlertAgain(!noAlertAgain);
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {noAlertAgain ? (
              <MaterialCommunityIcons
                name="checkbox-marked-outline"
                size={20}
                color="black"
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-outline"
                size={20}
                color="black"
              />
            )}
            <Text style={{ marginLeft: 3 }}>다시 보지 않기</Text>
          </View>
        </Pressable>
        <Pressable style={{ width: '100%' }} onPress={setAlert}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              borderTopWidth: 4,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600' }}>닫기</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default OpenCapsuleAlert;
