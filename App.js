import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import TaskList from './src/screens/TaskList';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Lato': require('./assets/fonts/Lato.ttf'),
  });

  // Verifica se as fontes foram carregadas
  if (!fontsLoaded) {
    return null;
  }

  return (
    <TaskList />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
