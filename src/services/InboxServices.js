import Service from './Service';
import dotenv from "dotenv";
import { encrypt, decrypt } from '../helpers/encryption'
import twilio from 'twilio';
const accountSid = process.env.accountSid; // Your Account SID from www.twilio.com/console
const authToken = process.env.authToken; // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

dotenv.config();


class InboxService extends Service {
    constructor(model) {
        super(model);
        this.receivesms = this.receivesms.bind(this);
        this.sendsms = this.sendsms.bind(this);
        this.smsstatus = this.smsstatus.bind(this);
        // this.getsetting = this.getsetting.bind(this);
    }


    async receivesms(data) {
        try {
            // console.log(data)
            const inboxdata = new this.model({
                MessageSid: data.MessageSid,
                Twilio_number: data.From,
                to: data.To,
                massage: data.Body,
                smsStatus: data.SmsStatus
            })
            const result = await inboxdata.save();
            return {
                error: false,
                statusCode: 202,
                data: result
            };

        } catch (err) {
            console.log(err)
            return {
                error: true,
                statusCode: 500,
                message: 'Error  '
            };
        }
    }


    async sendsms(data) {
        try {
            console.log(data)
            let smsdata = await client.messages
                .create({
                    body: data.Body,
                    to: data.To,
                    statusCallback: 'https://1704-2401-4900-1c02-3908-8e02-2e7d-e9da-ee78.in.ngrok.io/api/smsstatus', // Text this number
                    from: data.From,
                })
            var inbox = new this.model({
                MessageSid: smsdata.sid,
                smsStatus: smsdata.status,
                massage: smsdata.body,
                to: smsdata.to,
                Twilio_number: smsdata.from
            });
            data = await inbox.save()
            return {
                error: false,
                statusCode: 202,
                data: data
            };
        } catch (err) {
            console.log(err)
            return {
                error: true,
                statusCode: 500,
                message: 'Error '
            };
        }
    }

    async smsstatus(data) {
        try {
            const items = await this.model.findOne({ MessageSid: data.SmsSid })
            const result = await this.model.updateOne({ _id: items._id }, { smsStatus: data.MessageStatus }, { new: true })
            return {
                error: false,
                statusCode: 202,
                data: result
            };
        } catch (err) {
            console.log(err)
            return {
                error: true,
                statusCode: 500,
                message: 'Error'
            };
        }
    }



}

export default InboxService;