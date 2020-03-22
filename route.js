const mongoose		 = require('mongoose');
const db             = require('./config/db');

mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema;

var schema = new Schema({
	alpha3: String,
	state: String,
	closed_list: String,
});

var countries = mongoose.model('opened_borders', schema);

module.exports = function(app) {
    app.get('/', (req, res) => {
	const { country } = req.query
	
	const result = countries.find({ $or:[ {'state':'closed'}, {$and:[{'state':'partially closed'}, {'closed_list':country}]}]}, {_id:0}).lean().exec( function(err, data){
			console.log(">>>> " + data );
			res.send(JSON.stringify(data))
		});
  });
};