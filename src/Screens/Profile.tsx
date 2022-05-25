import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
} from 'react-native';
import { useDispatch } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBar from '../Components/NavBar/NavBar';
import AliasChange from '../Components/user/aliasChange';
import profileActions from '../actions/userProfile';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: '5%',
  },
  text: {
    width: 0.4 * SCREEN_WIDTH,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 0.05 * SCREEN_WIDTH,
  },
  button: {
    width: 0.2 * SCREEN_WIDTH,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aeaeae',
    textAlign: 'center',
    lineHeight: 40,
    marginLeft: 0.05 * SCREEN_WIDTH,
  },
});

function ProfileScreen({ navigation, route }: Props) {
  const [firstRender, setFirstRender] = useState(true);
  const [isEditting, setIsEditting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstRender) {
      return;
    }

    if (!isEditting) {
      dispatch(profileActions.request({ u_idx: 1 }));
    }
  }, [isEditting, firstRender]);

  const changeAlias = () => {
    setIsEditting(!isEditting);
    setFirstRender(false);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <View style={styles.container}>
          <Text
            style={{
              ...styles.text,
              width: 0.2 * SCREEN_WIDTH,
              marginLeft: 0,
            }}
          >
            닉네임
          </Text>
          {isEditting ? (
            <AliasChange alias="test" />
          ) : (
            <View style={styles.text}>
              <Text>Test</Text>
            </View>
          )}
          <Pressable onPress={changeAlias}>
            <Text style={styles.button}>변경하기</Text>
          </Pressable>
        </View>

        <View style={styles.container}>
          <Text
            style={{
              ...styles.text,
              width: 0.2 * SCREEN_WIDTH,
              marginLeft: 0,
            }}
          >
            보유한 캡슐
          </Text>
          <View
            style={{
              ...styles.text,
              width: 0.6 * SCREEN_WIDTH,
            }}
          >
            <Text>Test</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text
            style={{
              ...styles.text,
              width: 0.2 * SCREEN_WIDTH,
              marginLeft: 0,
            }}
          >
            개봉한 캡슐
          </Text>
          <View
            style={{
              ...styles.text,
              width: 0.6 * SCREEN_WIDTH,
            }}
          >
            <Text>Test</Text>
          </View>
        </View>

        <Pressable>
          <View
            style={{
              ...styles.button,
              width: 0.9 * SCREEN_WIDTH,
              backgroundColor: '#e4c86c',
              borderWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 0,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                letterSpacing: 5,
                color: '#fff',
              }}
            >
              회원탈퇴
            </Text>
          </View>
        </Pressable>
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
}

export default ProfileScreen;
