const dotenv = require('dotenv');
const express = require('express');
const cors=require('cors');
const app = express();


dotenv.config({ path: './config.env' })
require('./db/conn.js')
app.use(express.json())
app.use(cors({
    // origin: 'http://localhost:3000',
    origin:'https://master--effulgent-scone-3c8d71.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
const PORT = process.env.PORT;

app.use(require('./router/auth'));

const midware = (req, res, next) => {
    console.log("hello from middleware");
    next();
}
app.get('/', (req, res) => {
    res.send("home");
})
app.get('/about', midware, (req, res) => {
    res.send("about");
})
app.get('/services', (req, res) => {
    res.send("services");
})
app.get('/contact', (req, res) => {
    res.send("contact");
})
app.listen(PORT, () => {
    console.log(`listening server on ${PORT}`)
})