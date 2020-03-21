const mongoose		 = require('mongoose');
const db             = require('./config/db');

mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema;

var schema = new Schema({
	name: String,
	english: String,
	alpha3: String,
	iso: String
});

var countries = mongoose.model('countries', schema);

module.exports = function(app) {
    app.get('/', (req, res) => {
	const { country } = req.query
	const alpha = {'alpha3' : 'BLR'}
	


	const result = countries.find({'alpha3' : 'BLR'}, "name", function(err, data){
			console.log(">>>> " + data );
			res.send(JSON.stringify(data))
		});
  });
};