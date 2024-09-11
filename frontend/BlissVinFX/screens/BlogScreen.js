// BlogScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const blogPosts = [
  {
    id: '1',
    title: 'The Future of Currency Exchange',
    description: 'Exploring the latest trends and technologies in currency exchange.',
    //image: require('../assets/blog1.jpg'),
  },
  {
    id: '2',
    title: 'Tips for Managing Your Finances',
    description: 'Practical advice for budgeting and financial planning.',
    //image: require('../assets/blog2.jpg'),
  },
  {
    id: '3',
    title: 'Understanding Cryptocurrency',
    description: 'A beginner’s guide to the world of digital currencies.',
    //image: require('../assets/blog3.jpg'),
  },
];

const BlogScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BlogDetail', { blog: item })}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our Blog</Text>
      <FlatList
        data={blogPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default BlogScreen;