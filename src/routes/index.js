import express from 'express';
import userRoutes from './userRoute';
import postRoute from './postRoute';
import searchRoute from './searchRoute';
import inboxRoute from './inboxRoute';

const router = express.Router();

userRoutes(router);
postRoute(router);
searchRoute(router);
inboxRoute(router)

export default router;