import {Router} from 'express';
import userRouter from "./user.routes.js";
import authorize from "../middleware/auth.middleware.js";
import {createSubscription, getSubscription} from "../controller/subscription.controller.js";
const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({ message: "Get All Subscrbtion"})
});
subscriptionRouter.get('/user/:id',authorize, getSubscription)

subscriptionRouter.post('/',authorize, createSubscription)
subscriptionRouter.put('/:id', (req, res) => {
    res.send({ message: "Update Subscrbtions "})
});
subscriptionRouter.delete('/:id', (req, res) => {
    res.send({ message: "Delete Subscrbtions "})
});
subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({ message: "Get All User Subscrbtions "})
});
subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({ message: "Cancel  Subscrbtions "})
});
subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ message: "Get Upcoming renewals "})
});
export default subscriptionRouter;


