var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Init locals
  locals.section = 'book_detail';
  locals.filters = {
    id: req.params.id,
  };
  locals.data = {
    user: {},
    photo: '',
    service: []
  };

  // Load the current category filter
  view.on('init', function (next) {
    if (req.params.id) {
      keystone.list('User').model.findOne({ _id: locals.filters.id }).exec(function (err, result) {       
        let ids = result.service;
        locals.data.user = result;
        if (result.images && result.images.length > 0)
          locals.data.photo = result.images[0]['url'];
        if (ids && ids.length > 0)
        {
          keystone.list('Post').model.find({_id: {$in: ids}}).exec(function(err, result1) {
            locals.data.service = result1;
            next(err);
          });
        }
      });
    } else {
      next();
    }
  });

  // Render the view
  view.render('book_detail');
};