const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('./config/db');


mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema;

const schema = new Schema({
    alpha3: String,
    state: String,
    closed_list: Array,
});

const countries = mongoose.model('opened_borders', schema);

router.get('/', async (req, res) => {

    const {country} = req.query;

    try {
        const result = await countries.find({
            $or: [
                {state: 'closed'},
                {
                    $and: [
                        {state: 'partially closed'},
                        {closed_list: country}
                    ]
                }
            ]
        }, {_id: 0});

        console.log(">>>> " + result);

        await res.json(result)
    } catch (e) {
        console.log(e);
        res.status(400).json('УУУУУ АШЫБКА')
    }

});

module.exports = router;