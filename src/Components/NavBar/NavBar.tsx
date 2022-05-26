import { StyleSheet, View, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#000000',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    backgroundColor: '#ffffff',
    height: 74,
    width: 74,
    borderRadius: 37,
  },
  homeText: {
    backgroundColor: '#000000',
    height: 60,
    width: 60,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderRadius: 30,
  },
});

type RootStackParamList = {
  Home: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
  List: undefined;
  CreateCapsule: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

function NavBar({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <MaterialCommunityIcons name="bottle-tonic" size={28} color="gray" />
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => {
          navigation.navigate('List');
        }}
      >
        <Ionicons name="md-menu" size={28} color="gray" />
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => {
          navigation.navigate('CreateCapsule');
        }}
      >
        <Ionicons name="add-circle" size={28} color="gray" />
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Profile');
        }}
      >
        <Ionicons name="person" size={28} color="gray" />
      </Pressable>
    </View>
  );
}

export default NavBar;
