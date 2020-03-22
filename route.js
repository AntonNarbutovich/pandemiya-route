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

module.exports = async (app) => {
    app.get('/', async (req, res) => {
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
        }

    });
};