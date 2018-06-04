var keystone = require('keystone');

module.exports = function (req, res) {
	// res.send('hello,you can get reservation here');
	// if (!req.body.name || !req.body.startTime || !req.body.endTime) {
	// 	return res.sendError('incomplete data set');
	// }

	res.render('Reminder');
}