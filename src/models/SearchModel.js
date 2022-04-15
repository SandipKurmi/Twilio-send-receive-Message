import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class SearchModel {
    // eslint-disable-next-line class-methods-use-this
    initSchema() {
        const schema = new Schema({
            number: {
                type: Number,

                unique: true,
            },
            name: {
                type: String,
                default: null,
            }
        }, {
            timestamps: true,
        }, );
        schema.plugin(uniqueValidator);
        mongoose.model('search', schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('search');
    }

    // eslint-disable-next-line class-methods-use-this
    getModel() {
        return mongoose.model('search');
    }
}

export default SearchModel;