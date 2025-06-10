// src/screens/DetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { saveBookmark, removeBookmark, getBookmarks } from '../utils/storage';

const DetailScreen = ({ route }) => {
  const { article } = route.params;
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    checkIfBookmarked();
  }, []);

  const checkIfBookmarked = async () => {
    const bookmarks = await getBookmarks();
    const exists = bookmarks.some((item) => item.url === article.url);
    setBookmarked(exists);
  };

  const toggleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(article.url);
    } else {
      await saveBookmark(article);
    }
    setBookmarked(!bookmarked);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <View style={styles.header}>
        <Text style={styles.title}>{article.title}</Text>
        <TouchableOpacity onPress={toggleBookmark}>
          <Text style={styles.bookmark}>{bookmarked ? '🔖' : '📑'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.content}>{article.description || 'No description available.'}</Text>
      <Text style={styles.content}>{article.content || 'No content available.'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  bookmark: { fontSize: 24, marginLeft: 10 },
  content: { fontSize: 16, marginBottom: 10 },
});

export default DetailScreen;
