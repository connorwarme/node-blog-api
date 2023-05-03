const mongoose = require("mongoose")
const Schema = mongoose.Schema
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  }
})
BlogSchema.virtual("url").get(function() {
  return `/blog/${this._id}`
})

module.exports = mongoose.model("Blog", BlogSchema)