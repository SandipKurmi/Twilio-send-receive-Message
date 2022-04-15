import Controller from './Controller';
import Inbox from '../models/InboxModel';
import InboxServices from '../services/InboxServices';

const inboxService = new InboxServices(new Inbox().getInstance());

class InboxController extends Controller {
    constructor(service) {
        super(service);
        this.receivesms = this.receivesms.bind(this);
        this.sendsms = this.sendsms.bind(this);
        this.smsstatus = this.smsstatus.bind(this);

    }

    async receivesms(req, res) {
        console.log(req.body);
        var data = req.body
        const response = await this.service.receivesms(data);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }

    async sendsms(req, res) {
        var data = req.body
        const response = await this.service.sendsms(data);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }

    async smsstatus(req, res) {
        var data = req.body
        const response = await this.service.smsstatus(data);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }

}

export default new InboxController(inboxService);