import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'BOOKMARKS';

export const saveBookmark = async (article) => {
  const data = await getBookmarks();
  const newData = [article, ...data.filter(a => a.url !== article.url)];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const removeBookmark = async (url) => {
  const data = await getBookmarks();
  const newData = data.filter(a => a.url !== url);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const getBookmarks = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
