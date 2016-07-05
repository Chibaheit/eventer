import mongoose, { Schema } from 'mongoose'
import _ from 'lodash'
import User from './user'

const activitySchema = new Schema({
    title : {
        type: String
    },
    content : {
        type: String
    },
    location : {
        type: String
    },
    startTime : {
        type: Date
    },
    endTime : {
        type: Date
    },
    creator : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    participator : [{
        user : {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        time : {
            type: Date
        }
    }],
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'Attachment'
    }
})

activitySchema.methods.unjoin_all = async function() {
    for (let item of this.participator){
        const user = await User.findById(item.user);
        user.unjoin(this);
        await user.save();
        await this.save();
    }
}

const Activity = mongoose.model('Activity', activitySchema)

export default Activity
