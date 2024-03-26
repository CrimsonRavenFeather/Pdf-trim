const express = require('express');
const app = express();
const port = 4000;
app.set('view-engine', 'ejs');
var cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// authentication -------------------------------------------------------------------------------------------

app.use('/signin',require('./routes/signup'))

// authorization --------------------------------------------------------------------------------------------

app.use('/login',require('./routes/login'))

// multer ----------------------------------------------------------------------------------------------------

app.use('/upload',require('./routes/pdfEdit'))

// ------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
