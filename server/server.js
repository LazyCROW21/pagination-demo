const express = require('express');
const cors = require('cors')
const cars = require('./MOCK_DATA.json');

const app = express();
const PORT = 4000;

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.get('/api/cars', (req, res) => {
    let limit = 1000;
    let offset = 0;
    if(!isNaN(req.query.limit)) {
        limit = parseInt(req.query.limit)
    }
    if(!isNaN(req.query.offset)) {
        offset = parseInt(req.query.offset)
    }
    const rows = cars.slice(offset, offset+limit);
    const total = cars.length;
    res.send({ total, rows });
})

app.listen(4000, () => {
    console.log('Server listening on port: ' + PORT);
})