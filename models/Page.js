var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */
var Page = new keystone.List('Page', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
});

Page.add({
  title: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  image: { type: Types.CloudinaryImage },
  content: {
    brief: { type: Types.Textarea, height: 150 },
    extended: { type: Types.Textarea, height: 400 },
  }
});

Page.schema.virtual('content.full').get(function () {
  return this.content.extended || this.content.brief;
});

Page.defaultColumns = 'title, state|10%';
Page.register();