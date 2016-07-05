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
      type: Schema.Types.ObjectId,
      ref: 'Attachment'
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

userSchema.methods.joined = function (activity_id){
    return _.findIndex(this.activities, (item) => {
        return String(item.activity) == String(activity_id);
    });
}

userSchema.methods.join = function (activity){
    let index = this.joined(activity._id);
    if (index >= 0){
        console.log('joined');
        return;
    }
    let time = Date.now();
    this.activities.push({
        activity : activity._id,
        time : time
    })
    this.markModified('activities');
    activity.participator.push({
        user : this._id,
        time : time
    })
    activity.markModified('participator');
}

userSchema.methods.unjoin = function (activity){
    let index = this.joined(activity._id);
    if (index < 0){
        console.log('not joined before');
        return;
    }
    _.remove(activity.participator, (item) => {
        return String(item.user) == String(this._id);
    });
    activity.markModified('participator');
    _.remove(this.activities, (item) => {
        return String(item.activity) == String(activity._id);
    })
    this.markModified('activities');
}

userSchema.methods.followed = function (user_id) {
    return _.findIndex(this.followings, (item) => {
        return String(item.user) == String(user_id);
    });
}

userSchema.methods.follow = function (target){
    let index = this.followed(target._id);
    if (index >= 0){
        console.log('followed');
        return;
    }
    let time = Date.now();
    this.followings.push({
        user : target._id,
        time : time
    })
    this.markModified('followings');
}

userSchema.methods.unfollow = function (target){
    let index = this.followed(target._id);
    if (index < 0){
        console.log('not followed before');
        return;
    }
    _.remove(this.followings, (item) => {
        return String(item.user) == String(target._id);
    });
    this.markModified('followings');
}

const User = mongoose.model('User', userSchema)

export default User
