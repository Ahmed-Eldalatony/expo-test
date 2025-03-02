import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Slide10 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Slide 10 Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Slide10;
