import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  text: {
    width: 0.4 * SCREEN_WIDTH,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 0.05 * SCREEN_WIDTH,
  },
});

function AliasChange({ alias }: { alias: string }) {
  const [value, setValue] = useState(alias);
  const input: React.RefObject<TextInput> = useRef(null);

  useEffect(() => {
    input.current?.focus();
  });

  return (
    <View style={styles.text}>
      <TextInput
        ref={input}
        maxLength={20}
        onChangeText={text => setValue(text)}
      >
        {value}
      </TextInput>
    </View>
  );
}

export default AliasChange;
