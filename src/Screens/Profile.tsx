import { View, Text } from 'react-native';
import type { NativeStackScreenProps } from 'react-navigation/native-stack';
import NavBar from '../Components/NavBar/NavBar';

function ProfileScreen({ navigation, route }: NativeStackScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 12, justifyContent: 'center' }}>
        <Text> Profile </Text>
      </View>
      <NavBar style={{ flex: 1 }} navigation={navigation} route={route} />
    </View>
  );
}

export default ProfileScreen;
