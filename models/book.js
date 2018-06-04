var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * booking Model
 * ==========
 */
// var Book = new keystone.List('Book');
var Book = new keystone.List('Book', {
  autokey: { from: 'name', path: 'key', unique: true },
});

Book.add({
	name: { type: String, required: true },
	userId: { type: Types.Relationship, ref: 'User', index: true },
	serviceId: { type: Types.Relationship, ref: 'Post', index: true },
	bookingTime: { type: Types.Datetime, default: Date.now, reqired: true },
	state: { type: Types.Select, options: 'open, booked, canceled, closed', default: 'open', index: true },
	price: { type: Types.Money, currency:'en-gb' },	
	location: {type: Types.Location, defaults: {country: 'Australia'} },
	reviewMark: { type: Types.Number, reqired: true },
	reviewContent: { type: Types.Textarea, height: 150 },

	customerName: {type: String,  reqired: true },
	customerPhonenumber: {type: String,  reqired: true },
	customerEmail: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	customerDescription: { type: Types.Textarea , height: 150 },
	customerReminder: {type: Types.Relationship, ref: 'Reminder', many: false },

	termAgree: { type: Boolean, label: 'Terms of the user agreement', index: true },

});

// Provide access to Keystone
Book.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
// Book.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Book.defaultColumns = 'name, email, isAdmin';
Book.register();
