import mongoose from "mongoose";

const packageSchema = mongoose.Schema(
    {
        packageName:{
            type: String,
            required: true,
        },

        packageInfo:{
            type: String,
            required: false,
        },

        serviceDuration:{
            type: Number,
            required: true,
        },
        
        packagePrice:{
            type: Number,
            required:true,
        },
        image:String,

    },
    {
        timestamps: true,
    }
);

export const Package = mongoose.model('package',packageSchema);