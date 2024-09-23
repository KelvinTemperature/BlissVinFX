require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Middleware for parsing JSON requests
app.use(express.json());

// Root route for the app
app.get('/', (req, res) => {
  res.send('Welcome to the Currency Converter API');
});

// Route for converting currency
app.post('/convert', async (req, res) => {
  const { from, to, amount, userId } = req.body;

  try {
    // Fetch exchange rate from the API
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${from}`);
    
    // Extract rate from the API response
    const rate = response.data.conversion_rates[to];
    if (!rate) {
      return res.status(400).json({ success: false, message: `Conversion rate for ${to} not found` });
    }

    const convertedAmount = rate * amount;

    // Save conversion to Supabase
    const { data, error } = await supabase
      .from('conversions')
      .insert([{ 
        user_id: userId, 
        from_currency: from, 
        to_currency: to, 
        amount, 
        converted_amount: convertedAmount, 
        rate 
      }]);

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { convertedAmount, rate },
      message: 'Currency converted successfully',
    });
  } catch (error) {
    console.error('Error converting currency:', error.message);
    res.status(500).json({ success: false, message: 'Error converting currency' });
  }
});

// Route for fetching conversion history
app.get('/history/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from('conversions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching conversion history:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching conversion history' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Currency Converter backend listening at http://localhost:${port}`);
});