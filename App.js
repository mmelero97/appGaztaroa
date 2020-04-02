import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Bienvenidos a la aplicación de Marta :)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33cccc',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
