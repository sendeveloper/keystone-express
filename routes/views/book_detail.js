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
    photo: ''
  };

  // Load the current category filter
  view.on('init', function (next) {
    if (req.params.id) {
      keystone.list('User').model.findOne({ _id: locals.filters.id }).exec(function (err, result) {       
        locals.data.user = result;
        if (result.images && result.images.length > 0)
          locals.data.photo = result.images[0]['url'];
        next(err);
      });
    } else {
      next();
    }
  });

  // Render the view
  view.render('book_detail');
};