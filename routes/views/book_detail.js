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
    service: [],
    reminder: []
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
          keystone.list('Post').model.find({_id: {$in: ids}}).exec(function(err1, result1) {
            locals.data.service = result1;
            keystone.list('Reminder').model.find().exec(function(err2, result2) {
              locals.data.reminder = result2;
              next(err2);
            })
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