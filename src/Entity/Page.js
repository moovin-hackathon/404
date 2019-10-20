const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, 'Header user_id is required.']
        },
        name: {
            type: String,
            required: [true, 'Field name is required.']
        },
        url: {
            type: String,
            required: [true, 'Field url is required.']
        },
        status: {
            type: String,
            required: [true, 'Field status is required.']
        },
        image: {
            type: String,
            required: [true, 'Field image is required.']
        }
    }, 
    {
        toJSON: {
            virtuals: true,
          },
        timestamps: true
    }
);

PageSchema.virtual('image_url').get(function() {
    return `http://localhost:${process.env.PORT}/files/${this.image}`
  })

PageSchema.plugin(mongoosePaginate);

mongoose.model("Page", PageSchema);