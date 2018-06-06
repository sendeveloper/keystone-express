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

      async.each(locals.data.users, function (user, next) {
        var index = locals.data.users.indexOf(user);
        var ids = user.service;
        keystone.list('Post').model.find({_id: {$in: ids}}).exec(function(err1, result1) {
          locals.data.users[index]['services'] = result1;
          locals.data.users[index]['service_titles'] = '';
          result1.forEach(function(each, index2) {
            locals.data.users[index]['service_titles'] += each['title'] + "/";
          })
          if (locals.data.users[index]['service_titles'].length > 0)
            locals.data.users[index]['service_titles'] = locals.data.users[index]['service_titles'].slice(0,-1);
        });
        keystone.list('Book').model.find({ userId: user._id }).sort('bookingTime').limit(1).exec(function(err2, result2) {
          if (result2.length > 0)
          {
            const monthNames = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ];
            var stime = result2[0]['bookingTime'];
            var date = new Date(stime);
            locals.data.users[index]['schedule'] = {
              'date': date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear(), 
              'time': date.getHours() + ":" + date.getMinutes()
            };
          }
          next(err);
        })
      }, function (err) {
        next(err);
      });
		});
	});

	view.render('book');
}