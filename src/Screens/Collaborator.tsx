import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import searchAPI from '../api/userSearch';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: SCREEN_HEIGHT * 0.9,
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  input: {
    width: '70%',
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: '#aeaeae',
    borderRadius: 25,
  },
  submitBtn: {
    height: 50,
    width: '20%',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

interface UserData {
  u_alias: string;
  u_id: string;
  u_idx: number;
}

type OnChangeCollaborator = (payload: UserData[]) => void;
type SetModalVisible = (payload: boolean) => void;
function CollaboratorScreen({
  onChangeCollaborator,
  setModalVisible,
  collaboList,
}: {
  onChangeCollaborator: OnChangeCollaborator;
  collaboList: UserData[];
  setModalVisible: SetModalVisible;
}) {
  const [code, setCode] = useState<string>('');
  const [noUser, setNoUser] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<UserData | null>(null);
  const [list, setList] = useState<UserData[]>(collaboList);

  useEffect(() => {
    setList(collaboList);
  }, []);

  const onChangeCode = (payload: string) => setCode(payload);
  const searchRequest = () => async () => {
    setNoUser(false);
    const response = await searchAPI(code);
    if (response.result === 'success') {
      if (response.data === null) {
        // 해당코드를 가진 사용자 없음
        setNoUser(true);
        setSearchResult(null);
      } else {
        setSearchResult(response.data);
      }
    }
  };
  const addList = (payload: UserData) => {
    const newList = [...list];
    if (newList.filter(v => v.u_idx === payload.u_idx).length === 0) {
      newList.push(payload);
      setList(newList);
    }
  };

  const submitCollaborator = () => {
    onChangeCollaborator(list);
    setModalVisible(false);
  };

  const item = () =>
    list.map((v, i) => (
      <View
        style={{
          flexDirection: 'row',
          width: '80%',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
          padding: 10,
          backgroundColor: '#ffffff',
          borderRadius: 12,
        }}
        key={i}
      >
        <Text style={{ fontSize: 20, marginLeft: 10 }}>{v.u_alias}</Text>
        <Pressable
          onPress={() => {
            const newList = [...list];
            newList.splice(i, 1);
            setList(newList);
          }}
        >
          <Text
            style={{
              backgroundColor: '#333',
              borderRadius: 10,
              paddingHorizontal: 14,
              paddingVertical: 7,
              color: 'white',
            }}
          >
            삭제
          </Text>
        </Pressable>
      </View>
    ));

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          backgroundColor: '#555555',
          padding: 20,
          width: SCREEN_WIDTH * 0.9,
          borderRadius: 20,
          alignItems: 'center',
        }}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="친구의 코드를 입력해주세요"
            onChangeText={onChangeCode}
          />
          <Pressable style={styles.submitBtn} onPress={searchRequest()}>
            <Text>검색</Text>
          </Pressable>
        </View>
        <View
          style={{
            // flex: 1,
            height: 100,
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {searchResult !== null && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '100%',
                height: 40,
              }}
            >
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'gray',
                  paddingHorizontal: 20,
                  borderRadius: 10,
                }}
                onPress={() => addList(searchResult)}
              >
                <Ionicons name="person-add-sharp" size={24} color="black" />
              </Pressable>
              <Text
                style={{
                  fontSize: 30,
                  marginLeft: 20,
                }}
              >
                {searchResult.u_alias}
              </Text>
            </View>
          )}
          {noUser && (
            <Text
              style={{
                width: 200,
                height: 40,
                // fontSize: 24,
              }}
            >
              회원코드를 정확히 입력해주세요
            </Text>
          )}
        </View>
        <View
          style={{
            minHeight: 300,
            width: '100%',
            // backgroundColor: 'blue',
          }}
        >
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
              추가된 친구 ({list.length})
            </Text>
            {item()}
          </ScrollView>
        </View>
        <Pressable
          style={{
            width: 200,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#cecece',
            borderRadius: 20,
          }}
          onPress={submitCollaborator}
        >
          <Text>등록</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default CollaboratorScreen;
