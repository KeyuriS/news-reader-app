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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      )}

      <View style={styles.header}>
        <Text style={styles.title}>{article.title}</Text>
        <TouchableOpacity onPress={toggleBookmark}>
          <Text style={styles.bookmark}>{bookmarked ? '🔖' : '📑'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.meta}>{article.author ? `By ${article.author}` : ''}</Text>
      <Text style={styles.meta}>{article.publishedAt ? new Date(article.publishedAt).toDateString() : ''}</Text>

      <Text style={styles.description}>
        {article.description || 'No description available.'}
      </Text>

      <Text style={styles.content}>
        {article.content || 'No content available.'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginRight: 8,
  },
  bookmark: {
    fontSize: 24,
  },
  meta: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginVertical: 12,
  },
  content: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 24,
  },
});

export default DetailScreen;
