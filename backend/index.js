const { insertMany } = require('./Modal/product');

const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    { default: mongoose } = require('mongoose'),
    Product = require('./Modal/product'),
    Order = require('./Modal/order'),
    app = express(),
    port = 8000,
    connectionString = 'mongodb+srv://admin:Password1@cluster0.101ejri.mongodb.net/supermarket';

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// connect mongo
mongoose.connect(connectionString, { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open!!");
    }).catch(err => {
        console.log("no connection start");
    })

app.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send({ data: products })
})

app.post('/', (req, res) => {
    let order = req.body.map(i => {
        delete i["_id"];
        i["orderId"] = Date.now();
        return i;
    })
    Order.insertMany(order).then(() => {
        res.status(201).send({ data: "Success" });
    }).catch(err => {
        res.status(500).send({ data: "Error Occurd", message: err });
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}!`);
})