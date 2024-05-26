import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {type: String, unique: true, required: true,
    match: [/.+\@.+\../, "Please enter a valid email"]
 },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'author'],
    default: 'user'
  },
  subscriptionStatus: {
    plan:{
      type:String,
      enum: ['free', 'premium'],
      default: 'free',
    },
    startDate: { type: Date },
    endDate: { type: Date }
  },
    avatar: {
      type: String,
      trim: true
    },
    articles:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Article"
      }
    ],
  lastLogin: {
    type: Date
  },
}, {
  timestamps: true
});


// Define and export the User model
const userModel = mongoose.model('User', userSchema);
export default userModel;
