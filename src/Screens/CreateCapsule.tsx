import { View, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBar from '../Components/NavBar/NavBar';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

function CreateCapsuleScreen({ navigation, route }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <Text> 캡슐 생성 페이지 </Text>
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} route={route} />
    </View>
  );
}

export default CreateCapsuleScreen;
