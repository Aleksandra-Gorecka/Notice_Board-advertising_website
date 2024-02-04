const express = require('express');

//create new express app and save it as const 'app'
const app = express();

// start server
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
  });

//catch incorrect links
app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
});
