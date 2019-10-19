const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const HeatmapSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        page: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Page"
        },
        coordinates: {
            type: Array,
            required: true
        },
        incidents: {
            type: Number,
            default: 0
        }
    }, 
    {
        timestamps: true
    }
);

HeatmapSchema.plugin(mongoosePaginate);

mongoose.model("Heatmap", HeatmapSchema);