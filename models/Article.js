var mongoose = require("mongoose");
var assert = require("assert");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  story: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

Article.on("index", function(err) {
  assert.ifError(err);
  Article.create([{ name: "Val"}, { name: "Val"}], function(err) {
    console.log(err);
  })
})

module.exports = Article;
