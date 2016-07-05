import mongoose, { Schema } from 'mongoose'

const attachmentScheme = new Schema({
  // 附件类型
  // 0: 任意类型, 1: 图片, 2: 音乐
    type : {
        type: Number
    },
    // 二进制内容
    blob : {
        type: Schema.Types.Buffer
    }
})

const Attachment = mongoose.model('Attachment', attachmentScheme);

export default Attachment
