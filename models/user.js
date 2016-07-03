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
  phone: {
    type: String,
    default : ''
  },
  avator: {
    type: String,
    default : ''
  },
  email: {
    type: String,
    index: true,
    unique: true
  },
  isOrganization: {
    type: Boolean
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
  }],
  lastVisited: {
    type: Date,
    default: Date.now()
  }
})

const User = mongoose.model('User', userSchema)

export default User
