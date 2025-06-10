import axios from 'axios';

const API_KEY = 'https://newsapi.org/v2/everything?q=tesla&from=2025-05-10&sortBy=publishedAt&apiKey=API_KEY';

export const fetchHeadlines = async () => {
  const res = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  return res.data.articles;
};
