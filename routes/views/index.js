var keystone = require('keystone');
var async = require('async');
// var gallary = require('./gallery.js');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		galleries: [],
		users: [],
		posts: [],
		categories: [],
	};



	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.post = result;
			next(err);
		});

	});

	
	// Load all users
	view.on('init', function (next) {

		// find users with the exception of  admin user
		var q = keystone.list('User').model.find().where('isAdmin', false).sort('sortOrder');

		q.exec(function (err, results) {
			locals.data.users = results;
			
			console.log('==== users: ', locals.data.users)

			next(err);
		});


	});


	// Load all galleries
	view.on('init', function (next) {

		var q = keystone.list('Gallery').model.find().sort('sortOrder');

		q.exec(function (err, results) {
			locals.data.galleries = results;
			next(err);
		});

		console.log('=== galleries: ', locals.data.galleries);
	});

	// Load all posts
	view.on('init', function (next) {

		var q = keystone.list('Post').model.find().sort('sortOrder');

		q.exec(function (err, results) {
			locals.data.posts = results;
			console.log('=== posts: ', locals.data.posts);
			next(err);
		});
		
	});


	// Load all posts
	view.on('init', function (next) {

		var q = keystone.list('PostCategory').model.find().sort('sortOrder');

		q.exec(function (err, results) {
			locals.data.categories = results;
			console.log('=== categories: ', locals.data.categories);			
					// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				locals.data.categories.forEach(function(category, index) {
					keystone.list('Post').model.find().where('categories').in([category.id]).exec(function(err, posts) {
						locals.data.categories[index].services = posts;
						next(err);
				  	// console.log('---$$$$$ category[' + index +']: ', locals.data.categories[index].services);
					});
				});

			}, function (err) {
				next(err);
			});
		});
	});



	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});



	// Render the view
	view.render('index');

};

