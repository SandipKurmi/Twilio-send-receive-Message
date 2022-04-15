import Controller from '../controllers/InboxController';
import dotenv from "dotenv";
dotenv.config();

export default (router) => {
    router.post(`/api/receivesms`, Controller.receivesms);
    router.post(`/api/sendsms`, Controller.sendsms);
    router.post(`/api/smsstatus`, Controller.smsstatus);
    // router.post(`/api/send`, Controller.sendMessage);
    // router.post(`/api/inbox`, Controller.receiveMessage);
};