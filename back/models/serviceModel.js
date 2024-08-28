// import mongoose from "mongoose";

// const serviceItemSchema = mongoose.Schema(
//     {
//         serviceName: {
//             type: String,
//             required: true,
//         },
//         serviceInfo: {
//             type: String,
//             required: false,
//         },
//         serviceDuration: {
//             type: Number,
//             required: true,
//         },
//         servicePrice: {
//             type: Number,
//             required: true,
//         }
//     },
//     {
//         timestamps: true,
//     }
// );

// const serviceSchema = mongoose.Schema(
//     {
//         services: [serviceItemSchema]
//     },
//     {
//         timestamps: true,
//     }
// );

// export const Service = mongoose.model('service',serviceSchema);

import mongoose from "mongoose";

const serviceSchema = mongoose.Schema(
    {
        serviceName: {
            type: String,
            required: true,
        },
        serviceInfo: {
            type: String,
            required: false,
        },
        serviceDuration: {
            type: Number,
            required: true,
        },
        servicePrice: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Service = mongoose.model('Service', serviceSchema);
