import { View, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import NavBar from '../Components/NavBar/NavBar';
import { read_R } from '../Reducers/capsule';
import { getThumb } from '../Storages/storage';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

function CapsuleListScreen({ navigation, route }: Props) {
  const a = async () => {
    const b = await getThumb();
    console.log(b, 'main getThumb');
  };
  a();

  const dispatch = useDispatch();
  dispatch(read_R(5));
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <ScrollView>
          <View />
        </ScrollView>
        <Text> 캡슐리스트 페이지 </Text>
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} />
    </View>
  );
}

export default CapsuleListScreen;
