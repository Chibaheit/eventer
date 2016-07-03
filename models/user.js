import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: {
    type: String
  },
  nickname: {
    type: String
  },
  email: {
    type: String,
    index: true,
    unique: true
  },
  activities : [{
      activity : {
          type: Schema.Types.ObjectId,
          ref: 'Activities'
      },
      time : {
          type : Date,
          default : Date.now()
      }
  }],
  followings : [{
      user : {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }
  }]
  lastVisited: {
    type: Date,
    default: Date.now()
  }
})

const User = mongoose.model('User', userSchema)

export default User
