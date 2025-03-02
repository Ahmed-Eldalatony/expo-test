import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Slide3 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Slide 3 Content</Text>
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

export default Slide3;
