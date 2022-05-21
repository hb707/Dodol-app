import { View, Text } from 'react-native';
import NavBar from '../Components/NavBar/NavBar';

function CreateCapsuleScreen({ navigation, route }) {
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
