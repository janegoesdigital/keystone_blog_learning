var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Resource Model
 * ==========
 */

var Resource = new keystone.List('Resource', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Resource.add({
	title: { type: String, required: true },
	link: { type: Types.Url},
	// document: { type: Types.AzureFile },
	status: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	// image: { type: Types.CloudinaryImage },
	content: {
		description: { type: Types.Html, wysiwyg: true, height: 150 },
		// extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Resource.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Resource.defaultColumns = 'title, status|20%,link|20%, content.description|20%, categories|20%';
Resource.register();
