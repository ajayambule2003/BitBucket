const express = require('express');
const app = express();
const port = 3030;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// docker build -t node_app .

//docker run -p 3000:3000 node_app 