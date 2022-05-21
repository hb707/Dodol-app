import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function InnerApp() {
  return (
    <View style={styles.container}>
      <Text>Hello, native</Text>
    </View>
  );
}

export default InnerApp;
