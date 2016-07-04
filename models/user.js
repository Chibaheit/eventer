import mongoose, { Schema } from 'mongoose'
import _ from 'lodash'

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
  signature: {
    type: String
  },
  phone: {
    type: String,
    default : ''
  },
  avatar: {
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

userSchema.methods.joined = (activity_id) => {
    return _.findIndex(this.activity, (item) => {
        return item._id == activity_id;
    });
}

userSchema.methods.join = (activity) => {
    if (this.joined(activity._id)){
        return;
    }
    let time = Date.now();
    this.activities.push({
        activity : activity._id,
        time : time
    })
    activities.participator.push({
        user : this._id,
        time : time
    })
}

userSchema.methods.unjoin = (activity) => {
    if (!this.joined(activity._id)){
        return;
    }
    _.remove(activity.participator, (item) => {
        return item._id == this._id;
    });
    _.remove(this.activity, (item) => {
        return item._id == activity._id;
    })
}

userSchema.methods.followed = (user_id) => {
    return _.findIndex(this.followings, (item) => {
        return item._id == user_id;
    });
}

userSchema.methods.follow = (target) => {
    if (this.followed(target._id)){
        return;
    }
    let time = Date.now();
    this.followings.push({
        user : target._id,
        time : time
    })
}

userSchema.methods.unfollow = (target) => {
    if (this.followed(target._id)){
        return;
    }
    _.remove(this.followings, (item) => {
        return item._id == target._id;
    });
}

const User = mongoose.model('User', userSchema)

export default User
