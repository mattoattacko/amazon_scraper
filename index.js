const express = require('express');
const request = require('request-promise');

const PORT = process.env.PORT || 5000;
const app = express();

const apiKey = 'c628b8847274061837abb7bd5262f600';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

//Our Welcome Route
app.get('/', (req, res) => {
  res.send('Aloha and welcome to the Amazon Scraper API!');
}); 

//Get product details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
      const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
      
      res.json(JSON.parse(response));
  } catch (error) {
      res.json(error);
  }
});

//Get Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  
  try {
      const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);
      
      res.json(JSON.parse(response));
  } catch (error) {
      res.json(error);
  }
});

// Get product offers
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  
  try {
      const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
      
      res.json(JSON.parse(response));
  } catch (error) {
      res.json(error);
  }
});

// Get search results
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  
  try {
      const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
      
      res.json(JSON.parse(response));
  } catch (error) {
      res.json(error);
  }
});

app.listen(PORT, (req, res) => console.log(`Server running on port ${PORT}`));