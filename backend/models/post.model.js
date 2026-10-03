import mongoose, {Schema} from "mongoose";

const postSchema =new Schema(
    {
        name:{
            type: stringify,
            required: true,
            trim: true
        },
        description:{
            type: stringify,
            required:true,
            trim: true
        },
        age:{
            type: Number,
            required: true,
            min:1,
            max:60
        }
    },
    {
        timestamps: true
    }
)

export const post= mongoose.model('Post',postSchema);