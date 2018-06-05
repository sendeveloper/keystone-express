var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Init locals
  locals.section = 'blog';
  locals.filters = {
    id: req.params.id,
  };
  locals.data = {
    user: {},
  };

  // Load the current category filter
  view.on('init', function (next) {
    // var q = keystone.list('User').model.find().where('isAdmin', false).sort('sortOrder');

    // q.exec(function (err, results) {
    //   locals.data.users = results;
    //   next(err);
    // });
    if (req.params.id) {
      keystone.list('User').model.findOne({ _id: locals.filters.id }).exec(function (err, result) {       
        locals.data.user = result;
        next(err);
      });
    } else {
      next();
    }
  });

  // Render the view
  view.render('book_detail');
};
