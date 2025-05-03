import Subscription from "../models/subscriptions.model.js";
import {SERVER_URL} from "../config/env.js";
import { workflowClient } from "../config/upstash.js";



export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflow/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })

        console.log("Triggered workflowRunId:", workflowRunId);

        res.status(201).json({
            success: true,
            message: "Subscription created successfully.",
            data: subscription,
            workflowRunId
        });

    } catch (error) {
        next(error);
    }
};

export const getSubscription=async(req,res,next)=>{
    try{
        //check if the user is the same as the one in the token
        if(req.user.id!==req.params.id){
            const error=new Error("you are not the owner of this account.")
            error.status = 404;
            throw error;
        }
        const subscriptions=await Subscription.find({user:req.params.id})
        res.status(200).json({success:true,data:subscriptions})
    }catch(error){
        next(error);
    }

}