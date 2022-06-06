import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { delete_S } from '../Reducers/user';
import NavBar from '../Components/NavBar/NavBar';
import profileActions from '../actions/userProfile';
import { IState, IUser } from '../types';
import { getData, removeItemByKey } from '../Storages/storage';
import quitAction from '../actions/userQuit';

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
    fontSize: 15,
    fontFamily: 'font1',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 0.05 * SCREEN_WIDTH,
    letterSpacing: -1,
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

function ProfileScreen({ navigation }: Props) {
  const userState = useSelector((state: IState) => state.user);
  const capsuleState = useSelector((state: IState) => state.capsule);
  const [firstRender, setFirstRender] = useState(true);
  const [isEditting, setIsEditting] = useState(false);
  const [copyAlert, setCopyAlert] = useState('');
  const [value, setValue] = useState('test');
  const [amountCapsule, setAmountCapsule] = useState<number>(0);
  const [amountOpenedCapsule, setAmountOpenedCapsule] = useState<number>(0);

  const input: React.RefObject<TextInput> = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (firstRender) {
      setAmountCapsule(capsuleState.capsule.length);
      setAmountOpenedCapsule(
        capsuleState.capsule.filter(v => v.isOpened).length,
      );
    }

    if (!isEditting) {
      const u_idx = userState.me.u_idx as number;
      dispatch(
        profileActions.request({
          u_idx,
          u_alias: value,
          u_id: null,
          error: null,
        }),
      );
    } else {
      input.current?.focus();
    }
  }, [isEditting]);

  const changeAlias = () => {
    setIsEditting(!isEditting);
    if (firstRender) {
      setFirstRender(false);
    }
  };

  const quitUser = () => {
    const { u_idx } = userState.me;
    removeItemByKey('user');
    dispatch(quitAction.request({ u_idx }));
  };

  const quitAlert = () => {
    Alert.alert(
      '회원탈퇴',
      `탈퇴 시 모든 데이터가 삭제되며, 
      복구가 불가능합니다. 
      탈퇴하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        { text: '탈퇴', style: 'destructive', onPress: quitUser },
      ],
    );
  };

  const copyUserCode = async () => {
    const userCode = userState.me.u_id as string;
    await Clipboard.setStringAsync(userCode);
    setCopyAlert('회원코드가 복사 되었습니다.');
    setTimeout(() => {
      setCopyAlert('');
    }, 2000);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <Pressable onPress={copyUserCode}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#aeaeae',
              paddingVertical: 20,
              paddingHorizontal: 15,
              borderRadius: 15,
              marginBottom: '5%',
            }}
          >
            <Text style={{ fontSize: 16 }}>회원코드</Text>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {userState.me.u_id}
            </Text>
            <Feather name="copy" size={24} color="black" />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
            }}
          >
            {copyAlert !== '' && <Text>{copyAlert}</Text>}
          </View>
        </Pressable>

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
            <View style={styles.text}>
              <TextInput
                ref={input}
                maxLength={20}
                onChangeText={text => setValue(text)}
              >
                {userState.me.u_alias}
              </TextInput>
            </View>
          ) : (
            <View style={styles.text}>
              <Text>{userState.me.u_alias}</Text>
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
            <Text>{amountCapsule}</Text>
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
            <Text>{amountOpenedCapsule}</Text>
          </View>
        </View>

        <Pressable
          onPress={async () => {
            await removeItemByKey('user');
            const user: any = getData('user');
            dispatch(delete_S(user));
          }}
        >
          <View
            style={{
              ...styles.button,
              width: 0.9 * SCREEN_WIDTH,
              backgroundColor: '#e4c86c',
              borderWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 0,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'font1',
                letterSpacing: 5,
                color: '#fff',
              }}
            >
              {' '}
              로그아웃
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={quitAlert}>
          <View
            style={{
              ...styles.button,
              width: 0.9 * SCREEN_WIDTH,
              backgroundColor: '#815854',
              borderWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 0,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'font1',
                letterSpacing: 5,
                color: '#fff',
              }}
            >
              {' '}
              회원탈퇴
            </Text>
          </View>
        </Pressable>
      </View>
      <NavBar
        style={{ flex: 1 }}
        navigation={navigation}
        currentScreen="Profile"
      />
    </View>
  );
}

export default ProfileScreen;
