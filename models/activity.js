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
    }]
})

activitySchema.methods.unjoin_all = async () => {
    this.participator.map(async (item) => {
        const user = await User.findById(item._id);
        user.unjoin(this);
        user.save();
        this.save();
    });
}

const Activity = mongoose.model('Activity', activitySchema)

export default Activity
