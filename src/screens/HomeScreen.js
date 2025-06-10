// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import ArticleCard from '../components/ArticleCard';
import { fetchHeadlines } from '../services/newsApi';

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    try {
      const data = await fetchHeadlines();
      setArticles(data);
    } catch (e) {
      console.error('Failed to load news', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item) => item.url}
      renderItem={({ item }) => (
        <ArticleCard
          article={item}
          onPress={() => navigation.navigate('Detail', { article: item })}
        />
      )}
    />
  );
};

export default HomeScreen;
