var keystone = require('keystone');
var async = require('async');
var Book = keystone.list('Book');

module.exports = function (req, res) {
  // res.send ('this new api page!!!');
  var view = new keystone.View(req, res);
  var price = 0, duplicateEmail = false;
  if (!req.body.user_id)
    return res.sendError('incomplete data set');
  if (req.body.empservice)
  {
    keystone.list('Post').model.findOne({ _id: req.body.empservice }).exec(function (err, result) {
      price = result.price;
    });
  }
  if (req.body.email && req.body.datetime){
    // {$or: [{'email': email}, {'username': email}]}
    // keystone.list('Book').model.findOne({ customerEmail: req.body.email }).exec(function(err, result){
    keystone.list('Book').model.findOne({bookingTime: req.body.datetime}).exec(function(err, result){
      if (result == null)
      {
        var newBook = new Book.model({
          name: req.body.user_name,
          userId: req.body.user_id,
          serviceId: req.body.empservice ? req.body.empservice : '',
          bookingTime: req.body.datetime,
          state: 'open',
          price: price,
          location: '',
          reviewMark: '5',
          reviewContent: '',
          customerName: req.body.customername ? req.body.customername : '',
          customerPhonenumber: req.body.number ? req.body.number : '',
          customerEmail: req.body.email,
          customerDescription: req.body.description ? req.body.description : '',
          customerReminder: req.body.reminder ? req.body.reminder : '',
          termAgree: req.body.agree
        });
        newBook.save(function(err) {
          // post has been saved
          if (err)
            res.json({"Error": 'Email is already existed'});
          else
            res.json({});
        });
      }
      else
      {
        res.json({"Error": 'Date time is already set'});
      }
    })
  }
};

