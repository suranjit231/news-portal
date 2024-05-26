import mongoose from 'mongoose';

// Define the Article Schema
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['technology', 'business', 'sports', 'health', 'entertainment', 'other'],
    required: true
  },
  tags: [String],
  image:{
    type:String,
  },
  comments:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
  }
],
likes:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Like"
  }
],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }

});


const articleModel = mongoose.model("Article", articleSchema);
export default articleModel;