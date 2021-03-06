const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    author: {
      firstName: {type: String, required: true},
      lastName: {type: String, required: true}
    },
    content: {type: String, required: true}
  },
  {
    collection: 'blog_posts'
  }
);

blogPostSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    author: this.authorName,
    content: this.content,
    title: this.title
  };
}

const BlogPost = mongoose.model('Blog_Post', blogPostSchema);

module.exports = {BlogPost};
