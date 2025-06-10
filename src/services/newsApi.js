import axios from 'axios';

const API_KEY = '2e4347da68d3440cb33c523ebf89ef84';

export const fetchHeadlines = async () => {
  const res = await axios.get(
    `https://newsapi.org/v2/everything?q=apple&from=2025-06-09&to=2025-06-09&sortBy=popularity&apiKey=${API_KEY}`
  );
  return res.data.articles;
};
