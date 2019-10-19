const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

PageSchema.plugin(mongoosePaginate);

mongoose.model("Page", PageSchema);