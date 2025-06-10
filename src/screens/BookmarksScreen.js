// src/screens/BookmarksScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import ArticleCard from '../components/ArticleCard';
import { getBookmarks } from '../utils/storage';

const BookmarksScreen = ({ navigation }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const loadBookmarks = async () => {
    const data = await getBookmarks();
    setBookmarks(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadBookmarks);
    return unsubscribe;
  }, [navigation]);

  if (bookmarks.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>No bookmarks yet 📄</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onPress={() => navigation.navigate('Detail', { article: item })}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookmarksScreen;
