import mongoose, { Schema } from 'mongoose'

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
        type: Data
    },
    endTime : {
        type: Data
    },
    creator : {
        type: Schema.Types.ObjectId
        ref: 'User'
    },
    participator : [{
        user : {
            type: Schema.Types.ObjectId
            ref: 'User'
        },
        time : {
            type: Data
        }
    }]
})

const Activity = mongoose.model('Activity', activitySchema)

export default Activity
