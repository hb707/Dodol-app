import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import NavBar from '../Components/NavBar/NavBar';
import { read } from '../Reducers/memory';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

function HomeScreen({ navigation, route }: Props) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(read({ u_idx: 1 }));
  // }, []);
  const onPress = () => {
    dispatch(read({ u_idx: 1 }));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <Text> Hi </Text>
        <Button title="눌러봐" onPress={onPress} />
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
}

export default HomeScreen;
