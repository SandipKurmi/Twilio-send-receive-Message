import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class InboxModel {
    // eslint-disable-next-line class-methods-use-this
    initSchema() {
        const schema = new Schema({
            MessageSid: {
                type: String,
            },
            to: {
                type: String,
            },
            Twilio_number: {
                type: String,
            },
            massage: {
                type: String,
            },
            smsStatus: {
                type: String,
            }
        }, {
            timestamps: true,
        }, );
        schema.plugin(uniqueValidator);
        mongoose.model('Inbox', schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('Inbox');
    }

    // eslint-disable-next-line class-methods-use-this
    getModel() {
        return mongoose.model('Inbox');
    }
}

export default InboxModel;