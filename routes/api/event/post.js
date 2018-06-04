var keystone = require('keystone');
var Book = keystone.list('Book');

module.exports = function (req, res) {
	// res.send ('this new api page!!!');
	if (!req.body.name || !req.body.startTime || !req.body.endTime) {
		return res.sendError('incomplete data set');
	}

	var newBook = new Book();
	// Book.updateItem(newBook, req.body);

	Book.updateItem(newBook, req.body, function (error) {
		res.locals.enquirySubmitted = true;
		if  (error) res.locals.saveError =  true;
		res.render('addEvent');

	});
};

