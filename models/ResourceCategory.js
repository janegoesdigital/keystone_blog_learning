var keystone = require('keystone');

/**
 * ResourceCategory Model
 * ==================
 */

var ResourceCategory = new keystone.List('ResourceCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ResourceCategory.add({
	name: { type: String, required: true },
});

ResourceCategory.relationship({ ref: 'Resource', path: 'categories' });

ResourceCategory.register();
