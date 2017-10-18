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
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	addedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

	contentType: {type: Types.Select, options: 'entity, reading', index: true},
	entityType: {type: Types.Select, options: 'person, uni, gov body,research centre', index: true, dependsOn: {contentType: 'entity'} },
	status: {type: Types.Select, options: 'read, toRead', default: 'toRead', dependsOn: { contentType: 'reading'}},
	readingType : {type: Types.Select, options: 'book, article, report', dependsOn: { contentType: 'reading'}, },
	publicationYear: { type: Types.Date, index: true, dependsOn: { contentType: 'reading'} },
	author: {type:Types.Text, dependsOn: {contentType: 'reading'}},
	rating: {type: Types.Select, options: 'annoying, ok, good, I love it',},
	location: {Type: Types.Text},




	// status: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	// contributor: { type: Types.Relationship, ref: 'User', index: true },


	citation: { type: Types.Text, dependsOn: { readingType: 'article'} },
	publisher: { type: Types.Text, dependsOn: { readingType: 'book'} },
	content: {
		description: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	//I want to use the same set of topic categories as I use for posts - so that on the bottom of a post page I can link automatically to any resources I have on the topic


});

Resource.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Resource.defaultColumns = 'title, contentType|10%, link|20%, content.description|10%, content.extended|20%, categories|20%';
Resource.register();
