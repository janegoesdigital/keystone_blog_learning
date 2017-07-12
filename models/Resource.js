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
	link: { type: Types.Url}

	status: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	contributor: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	content: {
		description: { type: Types.Html, wysiwyg: true, height: 150 },
		// extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	//I want to use the same set of topic categories as I use for posts - so that on the bottom of a post page I can link automatically to any resources I have on the topic
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	//Set of categories for the type of content it might be.
	contentType: {type: Types.Select, options: 'cool tool, good blog, interesting article, interesting news', index: true},
});

Resource.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Resource.defaultColumns = 'title, status|20%,link|20%, content.description|20%, categories|20%';
Resource.register();
