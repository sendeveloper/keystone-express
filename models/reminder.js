var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * reminder Model
 * ==========
 */
// var Reminder = new keystone.List('Reminder');
var Reminder = new keystone.List('Reminder', {
  autokey: { from: 'bookingInterval', path: 'key', unique: true },
});

Reminder.add({	
	name: { type: String, required: true },
	bookingInterval: { type: String, reqired: true },
	reminderDescription: { type: String , wysiwyg: true, height: 150 },

});

// Provide access to Keystone
Reminder.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

/**
 * Registration
 */
Reminder.defaultColumns = 'name,bookingInterval, reminderDescription';
Reminder.register();