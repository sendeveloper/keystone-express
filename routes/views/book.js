var keystone = require('keystone');
var async = require('async');

module.exports = function (req, res) {
	// res.send('hello,you can get reservation here');
	// if (!req.body.name || !req.body.startTime || !req.body.endTime) {
	// 	return res.sendError('incomplete data set');
	// }
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'book';

	locals.data = {		
		users: [],		
	};

		// Load all users
	view.on('init', function (next) {

		// find users with the exception of  admin user
		var q = keystone.list('User').model.find().where('isAdmin', false).sort('sortOrder');

		q.exec(function (err, results) {
			locals.data.users = results;
			
			// console.log('==== Booking: users: ', locals.data.users);

			// async.each(locals.data.users, function (user, next) {

			// 	locals.data.users.forEach(function(user, index) {
			// 		// keystone.list('Post').model.find().where('author', user.service).exec(function(err, services) { 
			// 		// 	locals.data.users[index].service = services[0];
			// 		// 		next(err);
					
			// 	 //  	console.log('--- Booking: users[' + index +'].service: ', locals.data.users[index].service);			  	
						
			// 		// });

			// 	}, function (err) {
			// 		next(err);
			// 	});
			// });
			next(err);
		});
	});

	view.render('book');
}