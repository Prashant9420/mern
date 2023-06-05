const dotenv = require('dotenv');
const express = require('express');
const cors=require('cors');
const app = express();


dotenv.config({ path: './config.env' })
require('./db/conn.js')
app.use(express.json())
app.use(require('./router/auth'));
app.use(cors({
    origin: "*"
}));
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
const PORT = process.env.PORT;

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