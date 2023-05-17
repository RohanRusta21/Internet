const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/test-speed', async (req, res) => {
  try {
    const serversResponse = await axios.get('https://www.speedtest.net/api/js/servers?engine=js');
    const servers = serversResponse.data;

    const closestServer = servers[0]; // Select the closest server for testing

    const testUrl = `https://www.speedtest.net/api/js/test?engine=js&upload=1&dummy=${Date.now()}`;
    const testResponse = await axios.get(testUrl);
    const result = testResponse.data;

    const downloadSpeed = result.download / 1024 / 1024; // Convert to Mbps
    const uploadSpeed = result.upload / 1024 / 1024; // Convert to Mbps

    const speedTestResult = {
      downloadSpeed: downloadSpeed.toFixed(2),
      uploadSpeed: uploadSpeed.toFixed(2)
    };

    res.json(speedTestResult);
  } catch (error) {
    console.error('Error occurred during speed test:', error);
    res.status(500).json({ error: 'An error occurred during the speed test.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
