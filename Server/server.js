const express = require('express');
const dotenv = require('dotenv');
const homeroute = require('./routes/homeroute');
const logroute = require('./routes/logroute');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'chrome-extension://hjjnmjaamnhejbobfocncokpebdpiadb', // Replace with your extension's origin
    methods: ['GET', 'POST'], // Add other methods if needed
    allowedHeaders: ['Content-Type'],
  }));
dotenv.config({ path: './configs/.env' });

const PORT = process.env.PORT;

app.use('/api', homeroute);
app.use('/api', logroute);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})