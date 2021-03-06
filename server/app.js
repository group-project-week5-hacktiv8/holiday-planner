require('dotenv').config();
const express = require('express');
const routers = require('./routers/index');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/', routers);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`connected http://localhost:${PORT}`)
})