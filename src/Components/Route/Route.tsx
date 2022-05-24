import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Home from '../../Screens/Home';
import Profile from '../../Screens/Profile';
import CapsuleList from '../../Screens/CapsuleList';
import CreateCapsule from '../../Screens/CreateCapsule';
import MemoryList from '../../Screens/MemoryList';
import CreateMemory from '../../Screens/CreateMemory';

const Stack = createNativeStackNavigator();

function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitleAlign: 'center',
          animation: 'none',
          headerShadowVisible: true,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="List" component={CapsuleList} />
        <Stack.Screen name="CreateCapsule" component={CreateCapsule} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MemoryList" component={MemoryList} />
        <Stack.Screen name="CreateMemory" component={CreateMemory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;
