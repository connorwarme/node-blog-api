const mongoose = require("mongoose")
const Schema = mongoose.Schema
const CommentSchema = new Schema({
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
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
  date: {
    type: Date,
    default: new Date(),
  }
})

module.exports = mongoose.model("Comment", CommentSchema)