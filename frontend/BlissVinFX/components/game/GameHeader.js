// src/components/game/GameHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameHeader = ({ title, score }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#222',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  score: {
    fontSize: 18,
    color: '#ffdd00',
  },
});

export default GameHeader;