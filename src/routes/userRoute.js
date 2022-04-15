import UserController from '../controllers/UserController';
import auth from '../middleware/auth.middleware';

export default (router) => {
    router.get(`/api/users`,auth, UserController.getAll);
    router.post(`/api/user`, UserController.addUser);
    router.get(`/api/user/:id`, UserController.get);
    router.put(`/api/user/:id`, UserController.update);
    router.delete(`/api/user/:id`, UserController.delete);

    router.post(`/api/login`, UserController.login);
};
